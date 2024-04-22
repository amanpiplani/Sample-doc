export const apiRequest = async ({
	url,
	method,
	headers,
}) => {
	const options = {
		method,
		headers: {
			Accept: 'application/json',
			...headers
		}
	};
	console.log(options);

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return { data, responseStatus: response.status };
	} catch (error) {
		console.error(error);
		return error;
	}
};