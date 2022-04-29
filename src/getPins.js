import * as axios from "axios";

export const getPins = async (api_key, api_secret_key) => { 
    let url = "https://api.pinata.cloud/data/pinList";
    try {
        let response = await axios.get(url, {
            headers: {
                "pinata_api_key": api_key,
                "pinata_secret_api_key": api_secret_key
            }
        });
        console.log(response);
        return {
            success:true,
            data:response["data"]};
    }
    catch (err) {
        return {
            success: false,
            error:err
        }
    }
}