import React, { useState, useEffect } from 'react';
import { getPins } from '../../getPins';
import { useOwner } from '../context/Context';
import { API_KEY, API_Secret } from '../../pinata_keys';
import { NFT } from '../NFT/NFT';

export const Home = () => {
    const [hashArray, setHashArray] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        assigningHash();
    }, []);

    const reverseArray = (array) => {
        return array.slice().reverse();
    }    

    const assigningHash = async() => { 
        setLoading(true);
        let data = await getPins(API_KEY, API_Secret);
        if (data["success"]) {
            setHashArray(reverseArray(data["data"]["rows"]));
            console.log(reverseArray(data["data"]["rows"]));
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
                  <div className='d-flex justify-content-center flex-wrap'>
                      {
                          hashArray.map((item, index) => {
                              return (
                                  <NFT 
                                      ipfs_pin_hash={item.ipfs_pin_hash}
                                      index={index}
                                      hashArray={hashArray}
                                  />
                              )
                           })
                      }
                  </div>
                  :
                  <h3 className='text-center my-4'> No NFT Found... :( </h3>
              :<h3 className='text-center my-4'>Loading the NFTs...</h3>}
    </div>
  )
}
