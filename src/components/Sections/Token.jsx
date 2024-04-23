const Token = () => {
 const jsonContent = {
  "access_token": "2YotnFZFEjr1zCsicMWpAA",
   "token_type": "Bearer",
  "expires_in": 3600,
  "scope":"scopes of APIs"
   }
   const exampleCode = `
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

function base64UrlEncode(data) {
  return Buffer.from(data).toString('base64').replace(/=/g, '').replace(/\\+/g, '-').replace(/\//g, '_');
}

function generateJWT(header, payload, secret) {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', secret).update(encodedHeader + '.' + encodedPayload).digest('base64');

  return encodedHeader + '.' + encodedPayload + '.' + signature;
}

const currentTime = new Date()
const epochTimeInSeconds = Math.floor(currentTime.getTime() / 1000);

const currentTimeInMilliseconds = new Date().getTime();
const oneHourInMilliseconds = 60 * 60 * 1000;
const newTimeInMilliseconds = currentTimeInMilliseconds + oneHourInMilliseconds;
const newTimeInSeconds = Math.floor(newTimeInMilliseconds / 1000);

// Example usage:
const header = { "alg": "RS256", "typ": "JWT","kid":"02c3d8bb-e665-4759-bca9-69798e5b6af0" };
const requestBody = {
  requestId: uuidv4(),
  //other field of request body
}
const payload = { "jti": requestBody.requestId, "iat": epochTimeInSeconds, "iat": newTimeInSeconds,"content_hash": createHash('sha256').update(JSON.stringify(requestBody)).digest('base64')};
const secret = privateKey; //Add private key

const token = generateJWT(header, payload, secret);
console.log(token);
`;
  return (
    <div className='main'>
      <h1>Real-time API Access & Security</h1>
      <p>When trying to access the APIs, the approved client application must be authenticated in realtime. A two-step authentication process must be followed.</p>
      <ol>
        <li>OAuth Token</li>
        <li>JWT Token</li>
      </ol>
      <h2>OAuth Token</h2>
      <p>To authenticate the application, the client application makes HTTP POST request to end point</p>
      <a>https://apis.discover.com/auth/oauth/v2/token</a>
      <p>The HTTP POST request must provide the following parameters:</p>
      <ul>
        <li>HTTP Content-Type header with value application/x-www-form-urlencoded</li>
        <li>Request body payload is:</li>
      </ul>
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
            <td>grant_type</td>
            <td>True</td>
            <td>"client_credentials"</td>
          </tr>
          <tr>
            <td>scope</td>
            <td>True</td>
            <td>Scopes of the APIs which are accessed with this OAuth Token</td>
          </tr>
          <tr>
            <td>client_id</td>
            <td>True</td>
            <td>Api_key</td>
          </tr>
          <tr>
            <td>client_Secret</td>
            <td>True</td>
            <td>Api_Secret</td>
          </tr>
        </tbody>
      </table>
      <p>When the DFS Open API gateway receives the request, it authenticates the client application by using the client application id, secret and scope contained in the request. If the client application is authenticated, the DFS Open API gateway sends an HTTP response with a json payload such as</p>
      <div style={{border:'1px solid black'}}><pre>
        {"{"}
        {Object.keys(jsonContent).map(key => (
          <div key={key}>
            <span className="key">{key}:</span> {jsonContent[key]}
          </div>
        ))}
        {"}"}
      </pre>
      </div>
      <p>The json payload contains an access token which will be used later by the application to access the APIs, the expiration time of the access token, and the type of the token. Partners may use a single OAuth token or multiple OAuth tokens to facilitate multiple consumer application instances. By default, the token will expire in 1 hour. If the access token is expired, then the authentication process has to be repeated again.</p>
      <p>If the client application is not authenticated, HTTP status code (mainly 401), error, and error_description will be returned as the notification of error. See error handling process and error message description sections for details.</p>
      <h3>Sample Request and Response for OAuth Token</h3>
      <h4>Request:</h4>
      <div style={{border:'1px solid black'}}><p>POST /auth/oauth/v2/token?grant_type=client_credentials&scope=RWDS_xyz&client_id= 1c770836a7b54cedb445290c628727df&client_secret=e98e1bd6e71b42a0b4fac0b8f38b9bf4 HTTP/1.1</p>
       <p>Host: apis.discover.com</p>
       <p>Content-Type: application/json</p>
       <p>Cache-Control: no-cache</p>
       </div>
       <h3>Response:</h3>
       <div style={{border:'1px solid black'}}><p>Response-Status: HTTP/1.1 200 OK </p>
       <p>Cache-Control: no-store</p>
       <p>Content-Type: application/json;charset=UTF-8</p>
       <p>{"{"}</p>
       <p>"access_token":"e13bcb1c-a91a-4bf2-9c37-24bb432cd30e",</p>
       <p>"token_type":"Bearer",</p>
       <p>"expires_in":21600,</p>
       <p>"scope":"RWDS_xyz"</p>
       <p>{"}"}</p>
       </div>

       <h2>JWT Token</h2>
       <p>The client application generates a JWT token by using its own signing private key with JWT algorithm RS256.</p>
       <ul><li>The JWT token consists of 3 parts and each part is concatenated by using character ".".</li></ul>
       <p>Here is the description of the parts of the JWT token:</p>
       <ol><li>JWT Header - is in form of JSON object {"{"}"typ":"JWT","alg":"RS256", "kid":"xxx"{"}"}
            <ul>
              <li> "typ": is an optional field to assert the type of the claims object. By default, it is always “JWT” and can be ignored. </li>
              <li> "alg": asserts the algorithm used to sign the JWT claims</li>
              <li> "kid": is the key identifier to identify the key used to sign the token. The public key identified by the kid must be provided via the JWK endpoints mentioned in above section. (note: the JWS signing kid is the UUID kid for the JWS signing certificate.)</li>
            </ul>
       </li>
       <li>JWT Claims - is in form of JSON object {"{"}"jti": " 493111-778c-4d92-8cec-6bf57ba8234", "iat": 1561011419,"exp": 1563603419,“content_hash”: xxxx {"}"}
        <ul>
          <li>"jti": token id, unique identifier to the token, used for reporting callback. (note: can use randomly generated UUID for jti) </li>
          <li>"iat": issued at, the time at which the token was issued </li>
          <li>"exp": expiration time in seconds, it is the JWT expiration time which asserts when the token expires. </li>
          <li>"content_hash": the sha256 digest of the request body if there’s any. Otherwise, the field can be empty or does not exist.</li>
          </ul>
       </li>
       <li>JWT Signature – is the outcome of signing the base64URLSafeEncoded(JWT Header).base64URLSafeEncoded(JWT Claims) by applying JWT signature algorithm RS256 with the consumer JWT signing private key as signing.</li>
       </ol>
       <div>

      <p></p>
      <ol>
        <li>Header Generation
          <ol>
            <li>Create header map</li>
            <ol>
              <li>typ = "JWT"</li>
              <li>alg = "RS256"</li>
              <li>kid = kid value assigned at the gateway via the JWK endpoint</li>
            </ol>
          <li>Parse headers to UTF-8 JSON string</li>
          <li>Encode header json with Base64-URL safe encoding</li>
          </ol>
        </li>
        <li>
          JWT Claims
          <ol>
            <li>
              Create claims map
              <ol>
                <li>jti = requestBody.requestId (preffered) OR random UUID</li>
                <li>iat = current time (Eastern Time) in seconds</li>
                <li>exp = iat + time to live in seconds</li>
                <li>content_hash = sha256 digest of request body (see Appendix C)</li>
              </ol>
            </li>
            <li>Parse claims to UTF-8 JSON string</li>
            <li>Encode claims json with Base64-URL safe encoding</li>
          </ol>
        </li>
        <li>
          JWT Signature
          <ol>
            <li>concatenate encoded header string + "." + encoded claims string</li>
            <li>pass combined string bytes to signature method</li>
          </ol>
        </li>
        <li>
          JWT Signature
          <ol>
            <li>concatenate encoded header string + "." + encoded claims string</li>
            <li>pass combined string bytes to signature method</li>
            <ol>
              <li>Get Signature instance passing “RS256” as algorithm</li>
              <li>Initialize signature instance with private key</li>
              <li>Update signature instance with combined string bytes</li>
              <li>Update signature instance with combined string bytes</li>
            </ol>
            <li>Encode signature bytes with Base64-URL safe encoding</li>
          </ol>
        </li>
        <li>Finalize Token</li>
        <ol>
          <li>Concatenate encoded header string + “.” + encoded claims string + “.” + encoded signature, the result of this is your complete JWT token.</li>
        </ol>
      </ol>
    </div>
    <h3>Format Example</h3>
    <p>JWTHeader.JWTClaims.JWT Signature</p>
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <code>
        {exampleCode}
      </code>
    </div>
    </div>
  );
}

export default Token;
