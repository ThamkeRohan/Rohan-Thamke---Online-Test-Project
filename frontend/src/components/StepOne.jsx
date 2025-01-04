import React from 'react'

export default function StepOne({illnessHistory, recentSurgery, handleChange}) {
  return (
    <div className='form'>
      <textarea
        className="field"
        name="illnessHistory"
        placeholder="Current Illness History"
        value={illnessHistory}
        onChange={handleChange}
        required
      />
      <textarea
        className="field"
        name="recentSurgery"
        placeholder="Recent Surgery (time span)"
        value={recentSurgery}
        onChange={handleChange}
      />
    </div>
  );
}
