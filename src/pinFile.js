const axios = require("axios");
const FormData = require("form-data");


export const pinFileToIpfs = async (api_key, api_secret_key, pinningData) => {    
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let data = new FormData();
    data.append('file', pinningData.file);

    const metaData = JSON.stringify({
        name: pinningData.name,
        keyvalues: {
            content: pinningData.description
        }
    });

    data.append('pinataMetadata', metaData);

    const pinataOptions = JSON.stringify({
        cidVersion: 0
    });

    data.append('pinataOptions', pinataOptions);

    try {
        let response = await axios.post(url, data, {
        maxBodyLength: Infinity,
        headers: {
            pinata_api_key: api_key,
            pinata_secret_api_key: api_secret_key
        }
    });
        return {
            hash: response.data.IpfsHash,
            success:true
        }
    }
    catch (error) {
        console.log("Error occured", error);
        return {
            success: false,
            error: error
        }
    }
}