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
  const [participants, setParticipants] = useState([]);
  const [currentInitiativeIdx, setCurrentInitiativeIdx] = useState(0);
  const [socket, setSocket] = useState();

  useEffect(() => {
    setIsOwner(history.location.state?.owner);
    const s = io(config.SERVER_HOST);
    setSocket(s);
    s.on('room-size', roomSize => setUserCount(roomSize));
    s.on('add-to-initiative', char => {
      const cpy = [...participants];
      const currentParticipant = cpy.sort((a, b) => b?.score - a?.score)[currentInitiativeIdx];
      const newArr = [...cpy, char].sort((a, b) => b?.score - a?.score);
      setParticipants(newArr);
      if (char.score >= currentParticipant.score) {
        setCurrentInitiativeIdx(newArr.indexOf(currentParticipant));
      }
    });
    return () => s.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setParticipants(prev => [...prev].sort((a, b) => b.score - a.score)), [currentInitiativeIdx]);
  useEffect(() => {
    if (socket === undefined) return;
    socket.off('add-to-initiative');
    socket.on('add-to-initiative', char => {
      const cpy = [...participants];
      const currentParticipant = cpy.sort((a, b) => b.score - a.score)[currentInitiativeIdx];
      const newArr = [...cpy, char].sort((a, b) => b.score - a.score);
      setParticipants(newArr);
      if (char.score >= currentParticipant?.score) {
        setCurrentInitiativeIdx(newArr.indexOf(currentParticipant));
      }
    });
  }, [currentInitiativeIdx, participants, socket]);

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
        <RoomGuest
          participants={participants}
          setParticipants={setParticipants}
          currentInitiativeIdx={currentInitiativeIdx}
          setCurrentInitiativeIdx={setCurrentInitiativeIdx}
          socket={socket}
        />
      )}
    </>
  );
};

export default RoomView;
