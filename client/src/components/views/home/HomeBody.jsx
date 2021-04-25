import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const btnClasses = 'btn btn-lg btn-dark font-weight-bold';

const HomeBody = () => {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const onRoomCreated = () => {
    const roomId = uuidv4().slice(0, 8);
    history.push(`/room/${roomId}`, { owner: true });
    return;
  };

  const onRoomJoined = () => {
    setError('');
    if (roomId === '') {
      setError('The room id cannot be empty');
      return;
    }
    history.push(`/room/${roomId}`, { owner: false });
  };

  useEffect(() => {
    const err = history.location.state?.err;
    setError(err === 'no-room' ? 'Room with this id does not exist' : '');
    history.replace();
  }, [history]);

  return (
    <div className='container pt-4'>
      <div className='form-group row justify-content-center mx-1'>
        <button className={`${btnClasses} col-lg-5`} onClick={onRoomCreated}>
          Create a room
        </button>
      </div>
      <div className='form-group row justify-content-center mx-1'>
        <div className='btn-group-vertical col-lg-5 p-0 rounded'>
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
