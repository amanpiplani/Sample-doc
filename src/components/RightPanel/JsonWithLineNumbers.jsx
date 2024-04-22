
const JsonWithLineNumbers = ({ data }) => {
  const renderValue = (value) => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return <span style={{ color: 'blue' }}>{JSON.stringify(value)}</span>;
    }
    return JSON.stringify(value);
  };

  const renderJsonWithLineNumbers = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const jsonLines = jsonString.split('\n');
    return jsonLines.map((line, index) => {
      // Extracting key and value from the line
      // ToDo: Fix this!!!!!!!!!!!!!!!!
      const keyValueMatch = line.match(/^"([^"]+)"\s*:\s*(.*)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1];
        const value = JSON.parse(keyValueMatch[2]);
        return (
          <div key={index}>
            <span>{index + 1}. </span>
            <span>"{key}": </span>
            {renderValue(value)}
          </div>
        );
      } else {
        return (
          <div key={index}>
            <span>{index + 1}   </span>
            <span>{line}</span>
          </div>
        );
      }
    });
  };

  return (
    <pre style={{ lineHeight: '1.6' }}>
      {renderJsonWithLineNumbers()}
    </pre>
  );
};

export default JsonWithLineNumbers;