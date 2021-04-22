import React, { useState } from 'react';

const AddToInitiativeModal = ({ participants, onCharacterSelected }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  return (
    <div className='modal' id='add-to-initiative-modal' tabIndex='-1' role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-dark text-white'>
          <div className='modal-body form-group'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Add yourself to initiative
            </h5>
            <input type='text' className='form-control my-2' placeholder='Character name' />
            <input type='number' className='form-control my-2' placeholder='Initiative score' />
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
            <button type='button' className='btn btn-secondary' data-dismiss='modal'>
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
