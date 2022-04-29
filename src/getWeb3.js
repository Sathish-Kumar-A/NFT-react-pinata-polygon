import Web3 from "web3";
import { config } from "./config";
const { API_URL } = config;

export const getWeb3 = async () => {
    var web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            return web3;
        } catch (error) {
            console.log(error);
        }
    } else if (window.web3) {
        web3 = window.web3;
        return web3;
    } else {
        const provider = new Web3.providers.HttpProvider(
            API_URL
        );
        web3 = new Web3(provider);
        return web3;
    }
}