import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import config from '../../../config';
import RoomGuest from './guest/RoomGuest';
import RoomOwner from './owner/RoomOwner';
import RoomHeader from './RoomHeader';

const RoomView = () => {
  const history = useHistory();
  const [isOwner, setIsOwner] = useState(false);
  const [userCount, setUserCount] = useState(1);
  // TODO: remove initial state from currentInitiativeIdx and set participants initial state to [], when owner room view is done
  const [participants, setParticipants] = useState([
    {
      name: 'name',
      score: 3,
    },
    {
      name: 'name2',
      score: 21,
    },
    {
      name: 'name3',
      score: 12,
    },
    {
      name: 'name4',
      score: 23,
    },
  ]);
  const [currentInitiativeIdx, setCurrentInitiativeIdx] = useState(0);
  const [socket, setSocket] = useState();

  useEffect(() => setParticipants(prev => [...prev].sort((a, b) => b.score - a.score)), [currentInitiativeIdx]);
  useEffect(() => {
    setIsOwner(history.location.state?.owner);
    const s = io(config.SERVER_HOST);
    setSocket(s);
    s.on('room-size', roomSize => setUserCount(roomSize));
    s.on('get-initiative', initiative => {
      console.log(initiative);
      if (participants.length === 0) {
        setParticipants(initiative.participants);
        setCurrentInitiativeIdx(initiative.currentInitiativeIdx);
      }
    });
    s.on('add-to-initiative', char => {
      const cpy = [...participants];
      const currentParticipant = cpy.sort((a, b) => b.score - a.score)[currentInitiativeIdx];
      const newArr = [...cpy, char].sort((a, b) => b.score - a.score);
      setParticipants(newArr);
      if (char.score >= currentParticipant.score) {
        setCurrentInitiativeIdx(newArr.indexOf(currentParticipant));
      }
    });
    return () => s.disconnect();
  }, []);

  return (
    <>
      <RoomHeader userCount={userCount} socket={socket} />
      {isOwner ? (
        <RoomOwner
          participants={participants}
          setParticipants={setParticipants}
          currentInitiativeIdx={currentInitiativeIdx}
          setCurrentInitiativeIdx={setCurrentInitiativeIdx}
          socket={socket}
        />
      ) : (
        <RoomGuest participants={participants} currentInitiativeIdx={currentInitiativeIdx} socket={socket} />
      )}
    </>
  );
};

export default RoomView;
