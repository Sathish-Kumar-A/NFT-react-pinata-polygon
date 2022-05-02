import React, { useEffect,useState } from 'react';
import { useOwner } from '../context/Context';
import { buy_nft } from '../contract_methods/owner';
import { ownerOfToken } from '../contract_methods/owner';

export const NFT = ({ ipfs_pin_hash, index }) => {
    const { isOwner, contractOwnerAddress } = useOwner();
    const [tokenOwned, setTokenOwned] = useState(false);

    const buyNFT = async() => {
        await buy_nft(index+1);
    }

    useEffect(() => {
        checkBought()
    }, []);

    const checkBought = async() => {
        let tokenOwnerAddress = await ownerOfToken(index + 1);
        console.log(tokenOwnerAddress,contractOwnerAddress);
        if (tokenOwnerAddress === contractOwnerAddress) {
            setTokenOwned(true);
        }
    }

  return (
      <div className = 'col-12 col-md-5 col-lg-3 my-3 mx-3 border border-secondary rounded p-3' key={index}>
          <img
             src = {`https://gateway.pinata.cloud/ipfs/${ipfs_pin_hash}`}
             className="minted_img col-12"
             alt="minted_img"
             height={300}
          />
          {!isOwner &&
              <div>
                  <hr className='col-11 mx-auto'/>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='mb-0'>Price: 0.04 MATIC</h5>
                      <button className={`btn ${tokenOwned?"btn-primary":"btn-success"} text-white my-2 px-4`} onClick={buyNFT} disabled={!tokenOwned}>{tokenOwned?"Buy":"Sold"}</button>
                    </div>
                </div>
          }
    </div>
  )
}
