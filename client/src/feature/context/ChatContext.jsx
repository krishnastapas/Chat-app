import React, { useEffect, useState } from "react";

import { createEthereumContract } from "../../utils/constants";

export const ChatContext = React.createContext();

const { ethereum } = window;
const contract = createEthereumContract();

export const ChatProvider = ({ children }) => {
  //   const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [allUserList, setAllUserList] = useState();
  const [friendList, setFriendList] = useState();
  const [currentFriend, setCurrentFriend] = useState();

  // get all user connect to account
  const getAllUser = async () => {
    const list = await contract.getAllAppUser();
    console.log(list);
    setAllUserList(list);
  };

  // change current friend
  const changeFriend = (friend) => {
    setCurrentFriend(friend);
  };

  // check if wallet is connect
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

  // function to connect the wallet
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

  // read the message for friend from contract
  const readMessageFormContract = async (account) => {
    // create the contract
    let list = [];
    try {
      // calling conract function
      let data = await contract.readMessage(account);

      console.log(data);

      if (data && data.length > 0) {
        const new_array = [];

        for (let i = 0; i < data.length; i++) {
          new_array.push({
            msg: data[i].msg,
            sender: data[i].sender,
            time: data[i].timestamp._hex,
          });

          // console.log(data[i].msg)
          // console.log(data[i].sender)
          // console.log(data[i].timestamp._hex)
        }
        list = new_array.reverse();
      }
    } catch (error) {
      console.log(error);
    }
    return list;
  };

  // reading user name from the contract
  const getUserName = async (account) => {
    setIsLoading(true);
    // const contract = createEthereumContract();
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

  // reading all friend the user
  const getAllFriend = async () => {
    console.log(currentAccount);
    let data = [];
    try {
      const list = await contract.getMyFriendList();
      console.log(list);
      setFriendList(list);
      if (list.length > 0) {
        data = list;
        setCurrentFriend(list[0]);
      }
    } catch (error) {
      console.log(error);
    }

    return data;
  };

  // adding friend
  const addFriend = async (account, name) => {
    console.log(currentAccount);
    try {
      await contract.addFriend(account, name);
      await getAllFriend();
    } catch (error) {
      console.log(error);
    }
  };

  // create name
  const createName = async (name) => {
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

  // send message to ta friend
  const sendMessage = async (account, message) => {
    console.log(currentAccount);
    try {
      await contract.sendMessage(account, message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // const readMessage = async (account) => {
  //   const contract = createEthereumContract();
  //   console.log(contract);
  //   console.log(currentAccount);
  //   try {
  //     const messages = await contract.readMessage(account);
  //     console.log(messages);

  //     return messages;
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

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
        sendMessage,
        changeFriend
      }}
    >
      {!isLoading && children}
    </ChatContext.Provider>
  );
};
