import React from 'react';

const GuestIniativeList = ({ participants, currentInitiativeIdx, player }) => {
  return (
    <table className='table table-secondary m-0 p-0 table-bordered table-bordered-dark col-lg-9'>
      <thead className='thead-dark'>
        <tr>
          <th className='td-15'>Score</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((char, idx) => (
          <tr key={idx} className={idx === currentInitiativeIdx ? 'table-danger' : ''}>
            <td className='td-15'>{char.score}</td>
            <td className='td-75'>{char.name === player?.name ? `${char.name} (You)` : char.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GuestIniativeList;
