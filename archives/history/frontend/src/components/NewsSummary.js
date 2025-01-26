// frontend/src/components/NewsSummary.js
import React from 'react';

const NewsSummary = ({ summary }) => {
  return (
    <div>
      <h2>News Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default NewsSummary;