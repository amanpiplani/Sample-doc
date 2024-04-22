import React from 'react';
import JsonWithLineNumbers from './JsonWithLineNumbers';
import './Response.css';
import { responseCodeMapper } from '../../constants';

const ResponseExample = ({
  jsonData,
  theme = 'light',
  statusCode,
  styles,
  heading = 'Response Example',
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonData)
      .then(() => {
        console.log('Text copied to clipboard:', jsonData);
      })
      .catch(error => {
        console.error('Failed to copy text:', error);
      });
  };

  return (
    <div className={`${theme}-container`} style={{ marginTop: 50, ...styles }}>
      <div className={`${theme}-header`}>
        <div className={`${theme}-example`}>{heading}</div>
        <div className='copy-button' onClick={copyToClipboard}>Copy</div>
      </div>
      <div className={`${theme}-json`}>
        {statusCode && <div className='status-code'>
          {statusCode} - {responseCodeMapper[statusCode]}
        </div>}
        <JsonWithLineNumbers data={jsonData} />
      </div>
    </div>
  );
};

export default ResponseExample;