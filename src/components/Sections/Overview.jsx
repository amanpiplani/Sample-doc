const Overview = () => {

  return (
    <div className='main'>
      <h1>Overview</h1>
      <h2>Introduction</h2>
      <p>This Document is a companion piece to the other specifications that comprise the Discover® Digital Exchange (DDX) solution. There are different areas within the interaction with DDX that have different security requirements and they are explained in this document. They broadly fall under</p>
      <ol><li>Server-to-Server Communication</li></ol>
      <h2>Server-to-Server</h2>
      <p>API Communication Within the DDX platform the component that use the Server-to-Server Security restrictions mentioned in this document are</p>
      <ol><li>Stored Payment Token (SPT)</li></ol>
      <h2>Transport Level Encryption</h2>
      <p>All calls between Discover and their Partners will be carried out over TLS/SSL.</p>
      <h2>API Authentication and Authorization</h2>
      <p>The APIs hosted by Discover are protected by a Security Product called Layer 7. This is hosted within the Discover Network Infrastructure and is used to protect any inbound calls to APIs hosted by Discover. This applies to the following latest API specification versions:</p>
      <ul><li>Stored Payment Token API Specifications</li></ul>
      <h2>Steps to excute APIs</h2>
      <h3>
      <ol>
        <li>Application Registration</li>
        <li>Registering New Certificates to API Gateway</li>
        <li>Real-time API Access & Security</li>
      </ol>
      </h3>
    </div>
  );
}

export default Overview;
