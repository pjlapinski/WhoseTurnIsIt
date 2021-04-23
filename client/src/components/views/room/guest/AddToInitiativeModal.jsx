import { useStoreState, useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';

const AddToInitiativeModal = ({ errors, participants, onCharacterSelected, onCharacterAdded }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [initiative, setInitiative] = useState('');

  const characterName = useStoreState(state => state.characterName);
  const setCharacterName = useStoreActions(state => state.setCharacterName);

  return (
    <div className='modal' id='add-to-initiative-modal' tabIndex='-1' role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-dark text-white'>
          <div className='modal-body form-group'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Add yourself to initiative
            </h5>
            {errors?.characterName !== undefined ? <h6 className='text-danger'>{errors.characterName}</h6> : ''}
            <input
              type='text'
              className='form-control my-2'
              placeholder='Character name'
              value={characterName}
              onChange={e => setCharacterName(e.target.value)}
            />
            {errors?.initiative !== undefined ? <h6 className='text-danger'>{errors.initiative}</h6> : ''}
            <input
              type='number'
              className='form-control my-2'
              placeholder='Initiative score'
              value={initiative}
              onChange={e => setInitiative(e.target.value)}
            />
            <h5 className='modal-title' id='exampleModalLabel'>
              Or claim a character
            </h5>
            <select
              value={selectedCharacter}
              onChange={e => setSelectedCharacter(e.target.value)}
              className='custom-select'
            >
              {participants.map((char, idx) => (
                <option key={idx} value={idx}>
                  {char.name}
                </option>
              ))}
            </select>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => onCharacterAdded(characterName, initiative)}
            >
              Add
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => onCharacterSelected(selectedCharacter)}
              data-dismiss='modal'
            >
              Claim
            </button>
            <button type='button' className='btn btn-danger' data-dismiss='modal'>
              Just join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToInitiativeModal;
