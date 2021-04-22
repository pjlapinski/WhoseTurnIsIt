import React from 'react';
import { Link } from 'react-router-dom';

const RoomHeader = ({ userCount }) => {
  return (
    <header className='navbar navbar-expand sticky-top bg-dark'>
      <span className='text-white'>Users connected: {userCount}</span>
      <div className='ml-auto'>
        <Link to='/' className='btn btn-dark border px-5'>
          Exit
        </Link>
      </div>
    </header>
  );
};

export default RoomHeader;
