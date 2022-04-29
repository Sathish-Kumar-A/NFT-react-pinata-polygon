import { config } from "./config";
import { getWeb3 } from "./getWeb3";
import MyNFT from "./Polygon-NFT/artifacts/contracts/MyNFT.sol/MyNFT.json";

const {PUBLIC_KEY, PRIVATE_KEY, API_URL} = config;

const contractAddress = "0x4a02a6b863A9171495D28d69c53E2F9152120dc6";
const contract = MyNFT;


export async function mintNFT(tokenURI,web3) {
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    const tx = {
        "from": PUBLIC_KEY,
        "nonce": nonce,
        "to": contractAddress,
        "data": nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
        "gas":"5000000"
    }

    await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY).then((result) => {
        web3.eth.sendSignedTransaction(result.rawTransaction, (err, txHash) => {
            if (err) {
                console.log("Something went wrong",err);
            } else {
                console.log("The transaction hash is", txHash);
                return {
                    success: true,
                    hash:txHash
                }
            }
        })
    })
    .catch ((err) => {
        console.log("Promise failed", err);
        return {
            success: false,
            error:err
        }
    })
};
