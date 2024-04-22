import React, { useState } from 'react';
import './Response.css';
import { apiRequest } from '../../api';
import ResponseExample from './ResponseExample';
import RequestSample from './RequestSample';

const Parameters = ({ apiDetails, setShowLoadingIcon }) => {
  const { servers, parameters = ['Authorisation'], method } = apiDetails;
  const statuses = [
    { label: '200', value: 'code=200' },
    { label: '403', value: 'code=403' },
  ];
  const statusOptions = [
    { label: 'Statically Generated', value: '' },
    { label: 'Dynamically Generated', value: ', dynamic=true' }
  ]

  // Authorization
  const [headers, setHeaders] = useState({});
  const [server, setServer] = useState('PROD');
  const [statusCode, setStatusCode] = useState('code=200');
  const [type, setType] = useState('');
  const [response, setResponse] = useState({});

  const paramChange = (val, header) => {
    setHeaders({ ...headers, [header]: val });
  };

  const url = servers.find((s) => s.type === server)?.url;

  const apiRequestHandler = async () => {
    setShowLoadingIcon(true);
    const data = await apiRequest({
      url,
      method,
      headers: {
        ...headers,
        ...(server === 'mockServer' ? {
          Prefer: `${statusCode}${type}`
        } : { ...headers })
      },
    });
    setShowLoadingIcon(false);
    setResponse(data);
  };

  return (<>
    <div className='dark-container'>
      <div className='dark-header'>
        <div className='dark-example'>Parameters</div>
      </div>
      <div className='dark-text'>
        {parameters.map((param, i) => <>
          {param} : <input
            key={i}
            type='text'
            placeholder='string'
            className='dark-text-field'
            onChange={(e) => paramChange(e.target.value, param)}
          />
        </>)}
        <button className='button-class' onClick={apiRequestHandler}>Send API Request</button>
        <select className='dropdown' onChange={(e) => setServer(e.target.value)}>
          <optgroup label='SERVERS'>
            {servers.map((s, i) => {
              return <option key={i} value={s.type}>{s.type === 'PROD' ? 'PROD' : 'Mock Server'}</option>
            })}
          </optgroup>
        </select>
        <div style={{ paddingTop: 15 }}>
          {server === 'mockServer' && <>
            <select className='dropdown' onChange={(e) => setStatusCode(e.target.value)}>
              {statuses.map((s, i) => {
                return <option key={i} value={s.value}>{s.label}</option>
              })}
            </select>

            <select className='dropdown' onChange={(e) => setType(e.target.value)}>
              {statusOptions.map((s, i) => {
                return <option key={i} value={s.value}>{s.label}</option>
              })}
            </select>
          </>}
        </div>
      </div>
    </div >
    {Object.keys(response).length > 0 && <div>
      <ResponseExample
        jsonData={response.data}
        theme='dark'
        statusCode={response.responseStatus}
        styles={{ marginTop: 0 }}
        heading='Response'
      />
    </div>}
    <RequestSample
      url={url}
      statusCode={statusCode}
      authorization={headers}
      server={server}
      type={type}
    />
  </>
  );
};

export default Parameters;