import React, { useEffect,useState } from 'react';
import { useOwner } from '../context/Context';
import { buy_nft } from '../contract_methods/owner';
import { ownerOfToken } from '../contract_methods/owner';

export const NFT = ({ ipfs_pin_hash, index,hashArray }) => {
    const { isOwner, contractOwnerAddress,connectedAddress } = useOwner();
    const [tokenOwned, setTokenOwned] = useState(true);
    const [tokenOwner, setTokenOwner] = useState('');

    const buyNFT = async() => {
        let {success,tx_hash} = await buy_nft(index + 1);
        if (success) {
            checkBought();
        }
    }

    useEffect(() => {
        checkBought()
    }, [hashArray.length]);

    const checkBought = async() => {
        let tokenOwnerAddress = await ownerOfToken(index + 1);
        setTokenOwner(tokenOwnerAddress);
        // console.log(tokenOwnerAddress, contractOwnerAddress);
        
        if (tokenOwnerAddress === connectedAddress) {
            setTokenOwned(true);
        }

        else {
            setTokenOwned(false);
        }
    }

  return (
      <div className = 'col-12 col-md-5 col-lg-4 my-3 mx-3 border border-secondary rounded p-3' key={index}>
          <img
             src = {`https://gateway.pinata.cloud/ipfs/${ipfs_pin_hash}`}
             className="minted_img col-12"
             alt="minted_img"
             height={300}
          />

          {
              (isOwner && !tokenOwned) &&
              <div className='text-center'>
                  <div className = 'bg-success text-white py-2 rounded mx-auto col-4' > Sold to </div>
                  <h6 className='mx-auto col-10 mb-0 mt-3 bg-danger text-white py-2 rounded'>{tokenOwner}</h6>
              </div>
          }

          {
              tokenOwned &&
              <div className = 'mx-auto col-4 text-center py-2 bg-primary text-white rounded'> Owned </div>
          }

          {
              (!isOwner && !tokenOwned) &&
              <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='mb-0'>Price: 0.1 MATIC</h5>
                      <button className={`btn ${!tokenOwned?"btn-primary":"btn-success"} text-white my-2 px-4`} onClick={buyNFT} disabled={tokenOwned}>Buy</button>
              </div>
          }

          

          {/* {(!isOwner && !tokenOwned) &&
              <div>
                  <hr className='col-11 mx-auto'/>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='mb-0'>Price: 0.1 MATIC</h5>
                      <button className={`btn ${tokenOwned?"btn-primary":"btn-success"} text-white my-2 px-4`} onClick={buyNFT} disabled={!tokenOwned}>{tokenOwned?"Buy":"Sold"}</button>
                    </div>
                </div>
          }

          {!tokenOwned ?
              <div className='text-center'>
                  <div className = 'bg-success text-white py-2 rounded mx-auto col-4' > Sold to </div>
                  <h6 className='col-12 mb-0 mt-3'>{tokenOwner}</h6>
              </div> :
              <div className='mx-auto col-4 text-center py-2 bg-primary text-white rounded'>Owned</div>} */}
    </div>
  )
}
