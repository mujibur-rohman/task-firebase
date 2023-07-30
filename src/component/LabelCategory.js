import React from 'react';

const LabelCategory = ({ title }) => {
  return (
    <label
      className={`bg-purple-100 text-purple-500 px-3 py-1 rounded-full font-medium text-sm`}
    >
      {title}
    </label>
  );
};

export default LabelCategory;
