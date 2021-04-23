import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'bootstrap';
import GuestInitiativeList from './GuestInitiativeList';
import { mod } from '../../../../util/math';
import AddToInitiativeModal from './AddToInitiativeModal';

const RoomGuest = ({ participants, currentInitiativeIdx }) => {
  const [character, setCharacter] = useState({ name: 'name', score: 21 });
  const [addToInitiativeModal, setAddToInitiativeModal] = useState(null);
  const [modalErorrs, setModalErorrs] = useState({});

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
    setCharacter({ name: characterName, score: initiativeScore });
    console.log(character);
  };

  useEffect(() => {
    setAddToInitiativeModal(new Modal(document.getElementById('add-to-initiative-modal')));
  }, []);

  useEffect(() => {
    addToInitiativeModal?.show();
  }, [addToInitiativeModal]);

  return (
    <>
      {ReactDOM.createPortal(
        <AddToInitiativeModal
          errors={modalErorrs}
          character={character.name}
          participants={participants}
          onCharacterSelected={onCharacterInModalSelected}
          onCharacterAdded={onCharacterInModalAdded}
        />,
        document.body
      )}
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
                  <h4 className='text-warning overflow-wrap'>{participants[currentInitiativeIdx].name}</h4>
                  {mod(currentInitiativeIdx + 1, participants.length) !== currentInitiativeIdx ? (
                    <>
                      <h4 className='text-white'>Next character:</h4>
                      <h4 className='text-warning overflow-wrap'>
                        {participants[mod(currentInitiativeIdx + 1, participants.length)].name}
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
