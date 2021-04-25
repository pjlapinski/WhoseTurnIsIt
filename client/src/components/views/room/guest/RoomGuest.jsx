import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import GuestInitiativeList from './GuestInitiativeList';
import { mod } from '../../../../util/math';
import AddToInitiativeModal from './AddToInitiativeModal';
import { useHistory, useParams } from 'react-router-dom';

const RoomGuest = ({ participants, setParticipants, currentInitiativeIdx, setCurrentInitiativeIdx, socket }) => {
  const { id: roomId } = useParams();
  const [character, setCharacter] = useState();
  const [addToInitiativeModal, setAddToInitiativeModal] = useState(null);
  const [modalErorrs, setModalErorrs] = useState({});
  const history = useHistory();

  const onCharacterInModalSelected = characterIdx => {
    setCharacter(participants[characterIdx]);
  };

  const onCharacterInModalAdded = (characterName, initiative) => {
    let errors = false;
    const initiativeScore = parseInt(initiative);
    setModalErorrs({});
    if (characterName === undefined || characterName === '') {
      setModalErorrs({ characterName: 'The name cannot be empty' });
      errors = true;
    }
    if (isNaN(initiativeScore)) {
      setModalErorrs(prev => ({ ...prev, initiative: 'The initiative score cannot be empty' }));
      errors = true;
    }
    if (errors) return;
    const char = { name: characterName, score: initiativeScore, currentHp: 0, maxHp: 0, notes: '', hidden: false };
    setCharacter(char);
    socket.emit('add-to-initiative', char);
  };

  useEffect(() => setAddToInitiativeModal(new Modal(document.getElementById('add-to-initiative-modal'))), []);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('get-initiative', initiative => {
      setParticipants(initiative.participants);
      setCurrentInitiativeIdx(initiative.currentInitiativeIdx);
    });
    socket.emit('guest-room-id', roomId);
    socket.on('advance-initiative', () => {
      setCurrentInitiativeIdx(prev => (prev + 1) % participants.length);
    });
    socket.on('room-doesnt-exist', () => {
      addToInitiativeModal?.hide();
      history.push('/', { err: 'no-room' });
    });
  }, [socket]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.off('advance-initiative');
    socket.on('advance-initiative', () => {
      setCurrentInitiativeIdx(prev => (prev + 1) % participants.length);
    });
  }, [currentInitiativeIdx, participants.length]);

  useEffect(() => {
    addToInitiativeModal?.show();
  }, [addToInitiativeModal]);

  return (
    <>
      <AddToInitiativeModal
        errors={modalErorrs}
        participants={participants.filter(p => !p.hidden)}
        onCharacterSelected={onCharacterInModalSelected}
        onCharacterAdded={onCharacterInModalAdded}
      />
      {participants.length === 0 ? (
        <h1 className='text-center text-white'>The list of characters is empty!</h1>
      ) : (
        <>
          <div className='m-0 py-4 text-center'>
            {(() => {
              if (participants[currentInitiativeIdx] === undefined) return '';
              return (
                <>
                  <h4 className='text-white'>Current character:</h4>
                  <h4 className='text-warning overflow-wrap'>
                    {participants[currentInitiativeIdx].hidden ? '???' : participants[currentInitiativeIdx].name}
                  </h4>
                  {mod(currentInitiativeIdx + 1, participants.length) !== currentInitiativeIdx ? (
                    <>
                      <h4 className='text-white'>Next character:</h4>
                      <h4 className='text-warning overflow-wrap'>
                        {participants[mod(currentInitiativeIdx + 1, participants.length)].hidden
                          ? '???'
                          : participants[mod(currentInitiativeIdx + 1, participants.length)].name}
                      </h4>
                    </>
                  ) : (
                    ''
                  )}
                </>
              );
            })()}
          </div>
          <div className='m-0 p-0 row justify-content-center'>
            <GuestInitiativeList
              participants={participants}
              currentInitiativeIdx={currentInitiativeIdx}
              player={character}
            />
          </div>
        </>
      )}
    </>
  );
};

export default RoomGuest;
