import abi from './ChatApp.json'
import { ethers } from "ethers";

export const contractAddress = '0x6411909FCdeea8433720123B9DD3Aa3ac73ca4D8'
export const contractABI = abi.abi;

const { ethereum } = window;

export const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ChatsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(ChatsContract);
  return ChatsContract;
};