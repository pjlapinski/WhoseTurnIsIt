import React from 'react';

const OwnerInitiativeList = ({ participants, currentInitiativeIdx }) => {
  return (
    <table className='table table-secondary m-0 p-0 table-bordered table-bordered-dark col-lg-9'>
      <thead className='thead-dark'>
        <tr>
          <th className='overflow-wrap vw-5'>Score</th>
          <th className='overflow-wrap vw-100'>Name</th>
          <th className='overflow-wrap vw-5'>Current HP</th>
          <th className='overflow-wrap vw-5'>Max HP</th>
          <th className='overflow-wrap vw-100'>Notes</th>
          <th className='overflow-wrap vw-5'>Hidden</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((char, idx) => (
          <tr key={idx} className={idx === currentInitiativeIdx ? 'table-danger' : ''}>
            <td className='overflow-wrap vw-5'>{char.score}</td>
            <td className='overflow-wrap vw-100'>{char.name}</td>
            <td className='overflow-wrap vw-5 text-center'>{char.currentHp}</td>
            <td className='overflow-wrap vw-5 text-center'>{char.maxHp}</td>
            <td className='overflow-wrap vw-100'>{char.notes}</td>
            <td className='overflow-wrap vw-5 text-center'>
              <input type='checkbox' checked={char.hidden} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnerInitiativeList;
