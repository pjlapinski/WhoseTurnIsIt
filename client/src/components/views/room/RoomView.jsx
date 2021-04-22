import React, { useState, useEffect } from 'react';
import RoomGuest from './guest/RoomGuest';
import RoomHeader from './RoomHeader';

const RoomView = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCount, setUserCount] = useState(2);
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
  const [currentInitiativeIdx, setCurrentInitiativeIdx] = useState(2);
  useEffect(() => setParticipants(prev => [...prev].sort((a, b) => b.score - a.score)), [currentInitiativeIdx]);

  return (
    <>
      <RoomHeader userCount={userCount} />
      {isAdmin ? <></> : <RoomGuest participants={participants} currentInitiativeIdx={currentInitiativeIdx} />}
    </>
  );
};

export default RoomView;
