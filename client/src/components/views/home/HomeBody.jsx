import React, { useState } from 'react';

const btnClasses = 'btn btn-lg btn-light font-weight-bold';

const HomeBody = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const onRoomCreated = () => {
    return;
  };
  const onRoomJoined = () => {
    setError('');
    if (roomId === '') {
      setError('The room id cannot be empty');
      return;
    }
  };

  return (
    <div className='container pt-4'>
      <div className='form-group row justify-content-center mx-1'>
        <button className={`${btnClasses} col-lg-5`} onClick={onRoomCreated}>
          Create a room
        </button>
      </div>
      <div className='form-group row justify-content-center mx-1'>
        <div className='btn-group-vertical col-lg-5 p-0 bg-light rounded'>
          <input
            type='text'
            value={roomId}
            className='form-control form-control-lg'
            placeholder='Room id'
            onChange={e => setRoomId(e.target.value)}
          />
          <button className={`${btnClasses} rounded`} onClick={onRoomJoined}>
            Join a room
          </button>
        </div>
      </div>
      <h5 className='text-warning text-center'>{error}</h5>
    </div>
  );
};

export default HomeBody;
