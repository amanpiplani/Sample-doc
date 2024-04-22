import { useState } from 'react';
import './Responses.css';
import JsonViewer from '../Body/Body';

const Responses = ({ data, setStatusData }) => {
	const [status, setStatus] = useState(true);
	const errorText = 'Authorization Problem - either the JWT is malformed or the signature is bad, or permission is denied';
	const statusChangeHandler = (statusClick) => {
		if (status === statusClick) return;
		setStatus(!status);
		setStatusData(!status);
	}

	return <>
		<div className='heading-bar'>
			<div className='responses-heading'>Responses</div>
			<div className='status-buttons'>
				<div
					className={status ? 'status-active status-200-active' : 'status-200'}
					onClick={() => statusChangeHandler(true)}
				>
					200
				</div>
				<div
					className={status ? 'status-403' : 'status-active status-403-active'}
					onClick={() => statusChangeHandler(false)}
				>
					403
				</div>
			</div>
		</div>
		<div className='status-text'>{status ? 'OK' : errorText}</div>
		<JsonViewer data={data} />
	</>
}

export default Responses;