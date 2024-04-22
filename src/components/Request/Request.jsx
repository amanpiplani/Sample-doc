const Request = () => {
  return <>
    <div className='heading'>Request</div>
    <div className='sub-heading'>Headers</div>
    <div>
      <div className='body-key'>Authorization</div>
      &nbsp; &nbsp; <span className='body-value'>string</span>
    </div>
    <span className='body-value'>Bearer {'{bearer_token}'}</span>
  </>
}

export default Request;