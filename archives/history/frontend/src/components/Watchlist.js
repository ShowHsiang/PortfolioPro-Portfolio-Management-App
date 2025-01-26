// frontend/src/components/Watchlist.js
import React from 'react';

const Watchlist = ({ items }) => {
  return (
    <div>
      <h2>Watchlist</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;