import React, { useState, useEffect } from 'react';
import { getPins } from '../../getPins';
import { API_KEY, API_Secret } from '../../pinata_keys';
import { getWeb3 } from '../../getWeb3';

export const Home = () => {
    const [hashArray, setHashArray] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        assigningHash();
    }, []);
    
    const assigningHash = async() => { 
        setLoading(true);
        let data = await getPins(API_KEY, API_Secret);
        if (data["success"]) {
            setHashArray(data["data"]["rows"]);
            console.log(data["data"]["rows"]);
        }
        else {
            console.log("error occured", data["error"]);
        }
        setLoading(false);
    }

  return (
      <div>
          {!loading ?
              hashArray.length > 0 ?
                  <div>
                      {
                          hashArray.map((item, index) => {
                              return(< img
                              src = {
                                  `https://gateway.pinata.cloud/ipfs/${item.ipfs_pin_hash}`
                              }
                              key = {
                                  index
                              }
                              />)
                           })
                      }
                  </div>
                  :
                  <div> No image files stored </div>
              :<div>loading</div>}
    </div>
  )
}
