import Web3 from "web3";

export const useConnect = (abi, address) => {
  //   const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  window.ethereum.request({ method: "eth_requestAccounts" });

  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
};
