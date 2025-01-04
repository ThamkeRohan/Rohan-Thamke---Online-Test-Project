import React from 'react'

export default function StepThree({transactionId, handleChange}) {
  return (
    <div className='form'>
        <div className='payment'>
          <div className="qr">
            <h4>Scan and pay using UPI app</h4>
            <img className='qrcode' src="/assets/qrcode.png" alt="" />
          </div>
          <div className="amount">
            <p>Pay using any app</p>
            <p className='rupee'>$600</p>
          </div>
        </div>
      <input
        className='field'
        type="text"
        name="transactionId"
        placeholder="Transaction ID"
        onChange={handleChange}
        required
      />
    </div>
  );
}
