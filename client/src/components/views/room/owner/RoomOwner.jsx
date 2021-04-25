import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomIdDisplay from './RoomIdDisplay';
import OwnerInitiativeList from './OwnerInitiativeList';
import useLocalStorage from '../../../../hooks/useLocalStorage';

const updateSocketInitiative = (socket, data) => {
  socket.off('request-initiative');
  socket.on('request-initiative', () => {
    socket.emit('post-initiative', data);
  });
};

const RoomOwner = ({ participants, setParticipants, currentInitiativeIdx, setCurrentInitiativeIdx, socket }) => {
  const { id: roomId } = useParams();
  const [showId, setShowId] = useState(false);
  const [savedData, setSavedData] = useLocalStorage('savedToomData');

  useEffect(() => {
    if (savedData !== undefined) {
      setParticipants(savedData.participants);
      setCurrentInitiativeIdx(savedData.currentInitiativeIdx);
      updateSocketInitiative(socket, {
        participants: savedData.participants,
        currentInitiativeIdx: savedData.currentInitiativeIdx,
      });
    } else {
      setSavedData({
        participants,
        currentInitiativeIdx,
      });
    }
  }, []);

  useEffect(() => {
    setSavedData({
      participants,
      currentInitiativeIdx,
    });
  }, [participants, currentInitiativeIdx]);

  const onInitiativeAdvanced = () => {
    socket.emit('advance-initiative');
    setCurrentInitiativeIdx(prev => {
      const curr = (prev + 1) % participants.length;
      updateSocketInitiative(socket, { participants, currentInitiativeIdx: curr });
      return curr;
    });
  };

  const onInitiativeCleared = () => {
    setParticipants([]);
    setCurrentInitiativeIdx(0);
    setSavedData({ participants: [], currentInitiativeIdx: 0 });
  };

  useEffect(() => {
    if (socket === undefined) return;
    socket.emit('owner-room-id', roomId);
    socket.on('request-initiative', () => {
      socket.emit('post-initiative', { participants, currentInitiativeIdx });
    });
  }, [socket]);

  return (
    <>
      {showId ? (
        <RoomIdDisplay onSwitchToOwnerView={() => setShowId(false)} roomId={roomId} />
      ) : (
        <div className='mt-3 container-fluid'>
          <div className='row col justify-content-center align-items-center py-3'>
            <button className='btn btn-light font-weight-bold col-lg-2 mx-2' onClick={() => setShowId(true)}>
              Switch to room id view
            </button>
            <button className='btn btn-light font-weight-bold col-lg-2 mx-2'>Add a new character to initiative</button>
            <button className='btn btn-light font-weight-bold col-lg-2 mx-2' onClick={onInitiativeCleared}>
              Clear initiative
            </button>
            <button className='btn btn-light font-weight-bold col-lg-2 mx-2' onClick={onInitiativeAdvanced}>
              Advance initiative
            </button>
          </div>

          <div className='row justify-content-center'>
            <OwnerInitiativeList currentInitiativeIdx={currentInitiativeIdx} participants={participants} />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomOwner;
