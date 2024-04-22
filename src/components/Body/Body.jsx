import React, { useState } from 'react';
import { isObj } from '../../helper';
import './Body.css';

const JsonViewer = ({ data }) => {
  const [collapsedKeys, setCollapsedKeys] = useState([]);
  const downArrowUnicode = '\u25BE';
  const rightArrowUnicode = '\u25B8';

  const toggleCollapse = (key) => {
    setCollapsedKeys((prevCollapsedKeys) => {
      if (prevCollapsedKeys.includes(key)) {
        return prevCollapsedKeys.filter((k) => k !== key);
      } else {
        return [...prevCollapsedKeys, key];
      }
    });
  };

  const renderValue = (value) => {
    const dataType = typeof value;
    if (Array.isArray(value)) {
      return 'array';
    } else if (isObj(value)) {
      return 'object';
    } else {
      return dataType;
    }
  };

  const getArrow = (value, isCollapsed) => {
    if (Array.isArray(value) || isObj(value)) {
      return <span>
        <span className='minus'>-</span>
        {isCollapsed ? rightArrowUnicode : downArrowUnicode}
      </span>
    }
    return <span className='minus'>--</span>;
  }

  const renderJson = (obj, parentKey = '') => {
    return Object.entries(obj).map(([key, value], index) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      const isCollapsed = collapsedKeys.includes(fullKey);

      return (
        <div key={fullKey} className='full-key'>
          <span onClick={() => toggleCollapse(fullKey)} style={{ cursor: 'pointer' }}>
            {getArrow(value, isCollapsed)} <div className='body-key'>
              {key}
            </div>&nbsp; &nbsp; <span className='body-value'>{renderValue(value)}</span>
          </span>
          {!isCollapsed && typeof value === 'object' && value !== null && (
            <div style={{ marginLeft: '20px' }}>
              {renderJson(value, fullKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div className='sub-heading'>Body</div>
      {renderJson(data)}
    </div>
  );
};

export default JsonViewer;