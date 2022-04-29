import React, { useState } from 'react';
import { pinFileToIpfs } from '../../pinFile';
import pinataConfig from '../../pinata_keys';
import { mintNFT } from '../../mint-nft';
import { getWeb3 } from '../../getWeb3';
// import { mintNFT } from '../../mint-nft';
// import { mintNFT } from "../../Polygon-NFT/scripts/mint-nft.js";

export const Form = () => {
  const { API_KEY, API_Secret } = pinataConfig; 

  const [formInput, setFormInput] = useState({
    name: '',
    description: "",
    file: ""
  });

  const handleChange = e => {
    const { name } = e.target;
    if (name === "file") {
      setFormInput({
        ...formInput,
        [name]: e.target.files[0]
      });
    }
    else {
      setFormInput({
        ...formInput,
        [name]: e.target.value
      });
    }
  };

  const mintFile = async() => {
    let response = await pinFileToIpfs(API_KEY, API_Secret, formInput);
    console.log(response);
    if (response.success) {
      const web3 = await getWeb3();
      let nftResponse = await mintNFT(`ipfs://${response["hash"]}`, web3);
      console.log(nftResponse);
      setFormInput({
        name: '',
        description: "",
        file: ""
      })
    }
    else {
      alert("Error occured while adding files to pinata");
    }
  }

  return (
    <div className = "d-flex flex-column align-items-center justify-content-center" style = {{height: "100vh"}}>
      <div className='w-50'>

        <div>
            <label>Name:</label>
            <input
              className='form-control'
              name="name"
              value={formInput.name}
              onChange={handleChange}
            />
        </div>
        
          <div>
            <label>Description:</label>
            <textarea
              className='form-control'
              value={formInput.description}
              name="description"
              onChange={handleChange}

            /> 
        </div>
        
          <div>
              <label>Upload File:</label>
              <input
                type="file"
                className='form-control'
                name="file"
                onChange={handleChange}
            
              />
        </div>
        </div>
        <button className='btn btn-success mt-3 text-center' onClick={mintFile}>Mint</button>
    </div>
  )
}
