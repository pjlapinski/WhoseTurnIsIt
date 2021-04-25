import React from 'react';

const OwnerInitiativeList = ({ participants, setParticipants, currentInitiativeIdx }) => {
  return (
    <table className='table table-secondary m-0 p-0 table-bordered table-bordered-dark col-lg-9'>
      <thead className='thead-dark'>
        <tr>
          <th className='overflow-wrap vw-10'>Score</th>
          <th className='overflow-wrap vw-100'>Name</th>
          <th className='overflow-wrap vw-10'>Current HP</th>
          <th className='overflow-wrap vw-10'>Max HP</th>
          <th className='overflow-wrap vw-100'>Notes</th>
          <th className='overflow-wrap vw-10'>Hidden</th>
          <th className='overflow-wrap vw-10'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((char, idx) => (
          <tr key={idx} className={idx === currentInitiativeIdx ? 'table-danger' : ''}>
            <td className='overflow-wrap'>
              <input
                className='form-control'
                type='number'
                value={char.score}
                onChange={e =>
                  setParticipants(prev =>
                    prev.map(ch => (ch === char ? { ...ch, score: parseInt(e.target.value) } : ch))
                  )
                }
              />
            </td>
            <td className='overflow-wrap'>
              <input
                className='form-control'
                type='text'
                value={char.name}
                onChange={e =>
                  setParticipants(prev => prev.map(ch => (ch === char ? { ...ch, name: e.target.value } : ch)))
                }
              />
            </td>
            <td className='overflow-wrap text-center'>
              <input
                className='form-control'
                type='text'
                value={char.currentHp}
                onChange={e =>
                  setParticipants(prev =>
                    prev.map(ch => (ch === char ? { ...ch, currentHp: parseInt(e.target.value) } : ch))
                  )
                }
              />
            </td>
            <td className='overflow-wrap text-center'>
              <input
                className='form-control'
                type='text'
                value={char.maxHp}
                onChange={e =>
                  setParticipants(prev =>
                    prev.map(ch => (ch === char ? { ...ch, maxHp: parseInt(e.target.value) } : ch))
                  )
                }
              />
            </td>
            <td className='overflow-wrap'>
              <textarea
                className='form-control'
                rows='1'
                value={char.notes}
                onChange={e =>
                  setParticipants(prev => prev.map(ch => (ch === char ? { ...ch, notes: e.target.value } : ch)))
                }
              />
            </td>
            <td className='overflow-wrap text-center'>
              <input
                type='checkbox'
                checked={char.hidden}
                onChange={e =>
                  setParticipants(prev => prev.map(ch => (ch === char ? { ...ch, hidden: e.target.checked } : ch)))
                }
              />
            </td>
            <td className='overflow-wrap text-center'>
              <button
                className='btn btn-sm btn-danger'
                onClick={() => setParticipants(prev => prev.filter(ch => ch !== char))}
              >
                <i className='fas fa-trash-alt'></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnerInitiativeList;
