import React, { useEffect, useState } from "react";

import { createEthereumContract } from "../../utils/constants";

export const ChatContext = React.createContext();

const { ethereum } = window;

export const ChatProvider = ({ children }) => {
  //   const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [allUserList, setAllUserList] = useState();
  const [friendList, setFriendList] = useState();
  const [currentFriend, setCurrentFriend] = useState();
  const [messageList, setMessageList] = useState();

  const getAllUser = async () => {
    const contract = createEthereumContract();
    console.log(contract);
    const list = await contract.getAllAppUser();
    console.log(list);
    setAllUserList(list);
  };

  const checkIfWalletIsConnect = async () => {
    try {
      setIsLoading(true);
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // get the username
        const u = await getUserName(accounts[0]);

        if (u) {
          setUser(u);
          setIsLoading(false);
        } else {
          console.log("user not registered.");
          setIsLoading(false);
        }
        // getAllChats();
      } else {
        console.log("No accounts found");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const readMessageFormContract = async (chat) => {
    setCurrentFriend(chat);
    const contract = createEthereumContract();
    console.log(contract);
    let list = [];
    try {
      list = await contract.readMessage(chat.pubkey);
      console.log(list);
      setMessageList(list);
    } catch (error) {
      console.log(error);
    }
    return list;
  };

  const getUserName = async (account) => {
    setIsLoading(true);
    const contract = createEthereumContract();
    console.log(contract);
    console.log(currentAccount);
    try {
      const u = await contract.getUsername(account);
      if (!u) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      setUser(u);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoading(false);
    }
  };

  const getAllFriend = async () => {
    const contract = createEthereumContract();
    console.log(contract);
    console.log(currentAccount);
    try {
      const list = await contract.getMyFriendList();
      console.log(list);
      setFriendList(list);
      if(list.length>0){
        readMessageFormContract(list[0])
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (account, name) => {
    const contract = createEthereumContract();
    console.log(contract);
    console.log(currentAccount);
    try {
      await contract.addFriend(account, name);
      await getAllFriend();
    } catch (error) {
      console.log(error);
    }
  };

  const createName = async (name) => {
    const contract = createEthereumContract();
    console.log(contract);
    console.log(currentAccount);
    try {
      await contract.createAccount(name);
      const u = await contract.getUsername(currentAccount);
      console.log(u);
      if (!u) {
        setUser(null);

        return;
      }
      setUser(u);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    getAllUser();
    getAllFriend();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        getUserName,
        createName,
        user,
        allUserList,
        getAllFriend,
        addFriend,
        friendList,
        readMessageFormContract,
        currentFriend,
        messageList
      }}
    >
      {!isLoading && children}
    </ChatContext.Provider>
  );
};
