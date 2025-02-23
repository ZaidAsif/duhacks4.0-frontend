'use client';

import { BASIC_URL } from '@/constant/constant';
import axios from 'axios';
import { useState } from 'react';

export default function SendEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); 

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const { data } = await axios.post(
        `${BASIC_URL}/sendEmail`,
        { 
            recipientEmail: email,
        } ,
        {
            headers: {
                token
            }
        }
      );

      setStatus('success');
      setMessage(data.msg || 'Email sent successfully!');
      console.log(data.msg);
    } catch (error) {
      console.log(error);
      setStatus('error');
      setMessage('Failed to send email. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Send Verification Email</h1>
      <input
        type="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <br />
      <button
        onClick={handleSendEmail}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Send Email
      </button>
      <br />
      {message && (
        <p
          style={{
            color: status === 'success' ? 'green' : 'red',
            marginTop: '20px',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
