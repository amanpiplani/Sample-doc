export const isObj = (value) => {
	const dataType = typeof value;
	return dataType === 'object' && value !== null;
};
