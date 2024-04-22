const RequestPage = () => {

  return (
    <div className='main'>
      <h1>Registering new certificated to API Gateway</h1>
      <p>A signed JWT token will need to be provided by the Partner in the request header for the DFS gateway to authenticate the signature.A Public Key or JWK endpoint must be registered to the gateway using the API key and secret provided in the developer portal.</p>
      <p>To push new Public Keys so that your Private Key may be used for JWT signing or to register the JWK endpoint, the following API has been made available:</p>
      <h2>HTTP Method: Post</h2>
      <p><b>URI:</b> <a>https://apis.discover.com/dfs/jwk/v1/public-keys/partner/registration</a></p>
      <h2>www-form-URL Request Parameters:</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Parameter Name</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>kid</td>
            <td>true</td>
            <td>Unique UUID to identify the key. This kid will be used in the JWT header which is described in the JWT section.</td>
          </tr>
          <tr>
            <td>JWKS_Endpoint</td>
            <td>Conditional</td>
            <td>Optional parameter to register a partner’s JWKS endpoint dynamically.</td>
          </tr>
        </tbody>
      </table>
      <h3>Basic Authorization</h3>
      <p>This API requires basic authorization. The username will be the api key that is shared with you and the password is the api secret that is shared with you.</p>
      <h3>Headers</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Header Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Content-Type</td>
            <td>application/x-www-form-urlencoded</td>
          </tr>
        </tbody>
      </table>
      <h3>Body:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Key</th>
            <th>Required</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>x5c</td>
            <td>Optional - only required if the JWKS is not provided</td>
            <td>Public Key Certificate Value minus Header and Footer</td>
          </tr>
        </tbody>
      </table>
      <h3>mTLS X.509 Certificates Exchange</h3>
      <p>Mutual TLS (mTLS) authentication ensures that traffic is both secure and trusted in both directions between a client (partner)and server (DFS). With a root certificate authority (CA) in place, Access only allows requests from devices with a corresponding client certificate.</p>
      <p>The mTLS certificates can be exchanged offline over secured channel (such as via Secure email). The process would be as follows:</p>
      <p>DFS will share Root and Intermediate Certificates to API clients. These certificates will be signed by 3rd Party public CA which Partner must add to trust store. DFS would require Root (and Intermediate, if applicable) certificate(s) from API clients. Certificate(s) shall be signed by public CA - an API Consumer or 3rd Party public CA</p>
    </div>
  );
}

export default RequestPage;
