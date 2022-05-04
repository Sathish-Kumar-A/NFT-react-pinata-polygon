import React, { useEffect,useState,useContext,createContext } from 'react';
import { isOwner } from '../contract_methods/owner';


export const ownerContext = createContext();

export const Context = ({ children }) => {
    const [owner, setOwner] = useState({
        isOwner: false,
        contractOwnerAddress: '',
        connectedAddress: ''
    });
    // const [ownerAddress, setOwnerAddress] = useState('');
    
    useEffect(() => {
        ownerCheck()
    }, []);

    const ownerCheck = async () => {
        let { success, contractOwnerAddress, connectedAddress } = await isOwner();
        const admin=contractOwnerAddress===connectedAddress;
        console.log(success, contractOwnerAddress, connectedAddress);
        setOwner({isOwner:success,contractOwnerAddress:contractOwnerAddress,connectedAddress:connectedAddress,admin:admin});
    }
  return (
      <ownerContext.Provider value={owner}>
          {children}
    </ownerContext.Provider>
    //   <div>{children}</div>
  )
}

export const useOwner = () => { 
    const owner = useContext(ownerContext);
    return owner;
}
