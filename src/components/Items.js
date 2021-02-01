import React from 'react';

const Items = ({ items }) => (
  <div>
    <h1>Photos</h1>
    <div className="items">
      {items.map((item) => (
        <div
          key={item._id}
          className="item"
        >
          <img
            src={item.image.asset.url}
            alt={item.title}
            className="item-img"
          />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  </div>
);

export default Items;
