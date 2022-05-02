import React from 'react';
import "./header.css";
import { useNavigate } from 'react-router-dom';
import { useOwner } from '../context/Context';

export const Header = () => {
    const {isOwner} = useOwner();
    const navigate = useNavigate();
  return (
      <div className='d-flex align-items-center justify-content-around bg-secondary text-white py-3'>
            <h4 className='mb-0 home' onClick={()=>navigate("/")}>Home</h4>
            {isOwner && <h4 className='mb-0 mint' onClick={()=>navigate("/mintnft")}>Mint</h4>}
    </div>
  )
}
