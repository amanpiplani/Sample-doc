import './App.css';
import ResponseExample from './components/RightPanel/ResponseExample';
import Request from './components/Request/Request';
import Responses from './components/Responses/Responses';
import { useState } from 'react';
import RequestSample from './components/RightPanel/RequestSample';
import Parameters from './components/RightPanel/Parameters';
import LoadingIcon from './components/LoadingIcon';

const ApiDetails = ({ apiDetails }) => {
  const prodUrl = apiDetails.servers.find(({ type }) => type === 'PROD')?.url;
  const success = require('./data/' + apiDetails.files.success);
  const error = require('./data/' + apiDetails.files.error);
  const [data, setData] = useState(success);
  const [url, setUrl] = useState(prodUrl);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const setStatusData = (status) => {
    setData(status ? success : error);
  };
  return (
    <div className='main'>
      {showLoadingIcon && <LoadingIcon />}
      <h2>{apiDetails.displayName}</h2>
      <div className='url-main'>
        <div className='get-text'>
          {apiDetails.method}
        </div>
        <div className='get-url'>
          {apiDetails.url}
        </div>
      </div>
      <div className='container'>
        {/* Left Panel */}
        <div className='left-panel'>
          {apiDetails.detailsText.map((txt, i) => <p key={i}>{txt}</p>)}
          <Request />
          <Responses data={data} setStatusData={setStatusData} />
        </div>
        {/* Right Panel */}
        <div className='right-panel'>
          <Parameters apiDetails={apiDetails} setUrl={setUrl} setShowLoadingIcon={setShowLoadingIcon} />
          <ResponseExample jsonData={data} />
        </div>
      </div>
    </div>
  );
}

export default ApiDetails;
