const Authorization = () => {

  return (
    <div className='main'>
      <h2>Application Registration</h2>
      <p>In order to use the APIs or services described in the document, the API consumer must have a developer account created on Discover API Portal - <a href="https://developer.discover.com">https://developer.discover.com</a>. At this time, the portal access is by invitation only. Please contact your business partner at Discover to send you the account registration invitation.</p>
      <p>Once the application developer account is established, the developer can log into the API Portal to add an application and to retrieve security information to access eligible APIs.</p>
      <p>To use the APIs, the partner needs to have a Discover® Developer Center organization and application created:</p>
      <ul>
        <li>Organization name. Org name shall include DEV for pre-production environment applications or PROD for production applications</li>
        <li> Application name. App name shall include TEST for pre-production environment applications or PROD for production applications. e.g. AbcTest, AbcProd</li>
      </ul>
      <p>Once the request is approved by Discover, the application is assigned client credentials, access scope and an API Plan (e.g. Sandbox, Certification, or Prod Plan) that the developer partner can login to retrieve:</p>
      <ul>
            <li>Client application identifier (API Key),</li>
            <li>Client application secret,</li>
            <li>API Plan name</li>
            <li>OAuth access scope.</li>
      </ul>
      <p>This process is repeated when moving from test to production. A new set of credentials is generated for production access and using the incorrect credentials will result in Errors. The Partner is responsible and must keep non-production credentials separate from “production” cred</p>
    </div>
  );
}

export default Authorization;
