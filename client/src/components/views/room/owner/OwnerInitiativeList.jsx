import React, { useEffect, useState } from 'react';

const OwnerInitiativeList = ({ participants, setParticipants, currentInitiativeIdx, setCurrentInitiativeIdx }) => {
  const [innerParticipants, setInnerParticipants] = useState([...participants]);
  useEffect(() => setInnerParticipants(participants), [setInnerParticipants, participants]);

  return (
    <table className='table table-secondary m-0 p-0 table-bordered table-bordered-dark col-lg-9'>
      <thead className='thead-dark'>
        <tr>
          <th className='overflow-wrap vw-10'>Score</th>
          <th className='overflow-wrap vw-100'>Name</th>
          <th className='overflow-wrap vw-10'>Current HP</th>
          <th className='overflow-wrap vw-10'>Maximum HP</th>
          <th className='overflow-wrap vw-100'>Notes</th>
          <th className='overflow-wrap vw-10'>Hidden</th>
          <th className='overflow-wrap vw-10'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {innerParticipants.map((char, idx) => (
          <tr key={idx} className={idx === currentInitiativeIdx ? 'table-danger' : ''}>
            <td className='overflow-wrap'>
              <input
                className='form-control'
                type='number'
                value={char.score}
                onChange={e =>
                  setInnerParticipants(prev => {
                    const val = parseInt(e.target.value);
                    return prev.map(ch => (ch === char ? { ...ch, score: isNaN(val) ? '' : val } : ch));
                  })
                }
                onBlur={() => setParticipants(innerParticipants)}
              />
            </td>
            <td className='overflow-wrap'>
              <input
                className='form-control'
                type='text'
                value={char.name}
                onChange={e =>
                  setInnerParticipants(prev => prev.map(ch => (ch === char ? { ...ch, name: e.target.value } : ch)))
                }
                onBlur={() => setParticipants(innerParticipants)}
              />
            </td>
            <td className='overflow-wrap text-center'>
              <input
                className='form-control'
                type='number'
                value={char.currentHp}
                onChange={e =>
                  setInnerParticipants(prev =>
                    prev.map(ch => {
                      const val = parseInt(e.target.value);
                      return ch === char ? { ...ch, currentHp: isNaN(val) ? '' : val } : ch;
                    })
                  )
                }
                onBlur={() => setParticipants(innerParticipants)}
              />
            </td>
            <td className='overflow-wrap text-center'>
              <input
                className='form-control'
                type='number'
                value={char.maxHp}
                onChange={e =>
                  setInnerParticipants(prev =>
                    prev.map(ch => {
                      const val = parseInt(e.target.value);
                      return ch === char ? { ...ch, maxHp: isNaN(val) ? '' : val } : ch;
                    })
                  )
                }
                onBlur={() => setParticipants(innerParticipants)}
              />
            </td>
            <td className='overflow-wrap'>
              <textarea
                className='form-control'
                rows='1'
                value={char.notes}
                onChange={e =>
                  setInnerParticipants(prev => prev.map(ch => (ch === char ? { ...ch, notes: e.target.value } : ch)))
                }
                onBlur={() => setParticipants(innerParticipants)}
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
                onClick={() =>
                  setParticipants(prev => {
                    if (currentInitiativeIdx > idx) setCurrentInitiativeIdx(prevIdx => prevIdx - 1);
                    return prev.filter(ch => ch !== char);
                  })
                }
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
