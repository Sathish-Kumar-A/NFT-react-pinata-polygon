import { config } from "./config";
import MyNFT from "./Polygon-NFT/artifacts/contracts/MyNFT.sol/MyNFT.json";

const {PUBLIC_KEY, PRIVATE_KEY} = config;

export const contractAddress = "0xDedE0d25fFF3BB35fcEB0d1508439353fc9115E7";
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
