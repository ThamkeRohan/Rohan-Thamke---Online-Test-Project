import React from 'react'

export default function StepTwo({diabetes, allergies, others, handleChange}) {
  return (
    <div className='form'>
      <div>
        <label>
          <input
            className="field"
            type="radio"
            name="diabetes"
            value="Diabetics"
            checked={diabetes === "Diabetics"}
            onChange={handleChange}
          />
          Diabetics
        </label>
        <label>
          <input
            className="field"
            type="radio"
            name="diabetes"
            value="Non-Diabetics"
            checked={diabetes === "Non-Diabetics"}
            onChange={handleChange}
          />
          Non-Diabetics
        </label>
      </div>
      <input
        className="field"
        type="text"
        name="allergies"
        placeholder="Allergies"
        value={allergies}
        onChange={handleChange}
      />
      <input
        className="field"
        type="text"
        name="others"
        placeholder="Other Family Medical History"
        value={others}
        onChange={handleChange}
      />
    </div>
  );
}
