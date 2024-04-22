import React from 'react';
import './Response.css';

const RequestSample = ({
  url,
  authorization,
  server,
  statusCode,
  type,
}) => {
  const preferCode = server === 'mockServer' ? `,
      Prefer: '${statusCode}${type}'`: '';
  const codeString = `\
  const url = '${url}';
  const options = { 
    method: 'GET', 
    headers: { 
      Authorization: '${authorization.Authorization}', 
      Accept: 'application/json'${preferCode}
    }
  }};

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
      .then(() => {
        console.log('Text copied to clipboard:', codeString);
      })
      .catch(error => {
        console.error('Failed to copy text:', error);
      });
  };

  return (
    <div className='light-container' style={{ marginTop: 50 }}>
      <div className='light-header'>
        <div className='light-example'>Request Sample: Javascript/Fetch</div>
        <div className='copy-button' onClick={copyToClipboard}>Copy</div>
      </div>
      <div className='light-code'>
        <pre>{codeString}</pre>
      </div>
    </div>
  );
};

export default RequestSample;
