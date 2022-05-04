import { getWeb3 } from "../../getWeb3";
import { contractAddress } from "../../mint-nft";
import MyNFT from "../../Polygon-NFT/artifacts/contracts/MyNFT.sol/MyNFT.json";


export const isOwner = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(MyNFT.abi, contractAddress);
    const ownerAddress = await contract.methods.getOwner().call();
    if (ownerAddress === accounts[0]) { 
        return {
            success: true,
            contractOwnerAddress: ownerAddress,
            connectedAddress: accounts[0]
        }
    }
    else {
        return {
            success: false,
            contractOwnerAddress: ownerAddress,
            connectedAddress: accounts[0]
        }
    }
}

export const ownerOfToken = async (tokenId) => { 
    const web3 = await getWeb3();
    const contract = new web3.eth.Contract(MyNFT.abi, contractAddress);
    const ownerAddress = await contract.methods.ownerOf(tokenId).call();
    return ownerAddress;
}

export const buy_nft = async (token_id) => { 
    const price=0.1*10**18;
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(MyNFT.abi, contractAddress);
    const token_id_response = await contract.methods.transferToken(token_id).send({ from: accounts[0],value:price });
    return {
        success: true,
        tx_hash:token_id_response
    };
}