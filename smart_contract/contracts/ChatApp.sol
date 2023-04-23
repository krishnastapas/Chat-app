//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.0;

contract ChatApp {

    // user struct
    struct user {
        string name;
        friend[] friendList;
    }

    // friend struct
    struct friend {
        address pubkey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUser;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    // check user exit

    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // create / register user account
    function createAccount(string calldata name) external {

        
        // require(checkUserExist(msg.sender) == false, "user already exists");
        require(bytes(name).length > 0, "username cannot be empty");

        userList[msg.sender].name = name;

        getAllUser.push(AllUserStruct(name, msg.sender));

        
    }

    // get userName
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "User is not registered");
        // if(!checkUserExist(pubkey)) return "";
        return userList[pubkey].name;
    }

    // ADD friends
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered!");
        require(
            msg.sender != friend_key,
            "User cannot add themselves as friend."
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "These User are already friends."
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //get chat code

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    //send Message
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExist(msg.sender), "Create an account");
        require(checkUserExist(friend_key), "User is not registered");
        require(
            checkAlreadyFriends(msg.sender, friend_key),
            "You are not friend."
        );

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // read messages
    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns (AllUserStruct[] memory) {
        return getAllUser;
    }
}
