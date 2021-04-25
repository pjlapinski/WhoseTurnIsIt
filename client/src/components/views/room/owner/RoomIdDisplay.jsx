import React from 'react';

const RoomIdDisplay = ({ roomId, onSwitchToOwnerView }) => {
  return (
    <div className='text-center d-flex flex-column justify-content-center align-items-center'>
      <h1 className='display-4 text-white font-weight-bold mt-5 pt-5'>Room id:</h1>
      <h1 className='display-3 text-warning font-weight-bold my-5'>{roomId}</h1>
      <button onClick={onSwitchToOwnerView} className='btn btn-light font-weight-bold my-5'>
        Switch to owner view
      </button>
    </div>
  );
};

export default RoomIdDisplay;
