import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomIdDisplay from './RoomIdDisplay';

const RoomOwner = ({ participants, setParticipants, currentInitiativeIdx, setCurrentInitiativeIdx, socket }) => {
  const { id: roomId } = useParams();
  const [showId, setShowId] = useState(false);

  useEffect(() => {
    if (socket === undefined) return;
    socket.emit('owner-room-id', roomId);
    socket.on('request-initiative', () => {
      socket.emit('post-initiative', { participants, currentInitiativeIdx });
    });
    return () => socket.disconnect();
  }, [socket]);

  return (
    <>
      {showId ? (
        <RoomIdDisplay onSwitchToOwnerView={() => setShowId(false)} roomId={roomId} />
      ) : (
        <div className='mt-3 container'>
          <div className='row justify-content-center my-2'>
            <button className='btn btn-light font-weight-bold col-lg-4' onClick={() => setShowId(true)}>
              Switch to room id view
            </button>
          </div>
          <div className='row justify-content-center my-2'>
            <button className='btn btn-light font-weight-bold col-lg-4'>Add a new character to initiative:</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomOwner;
