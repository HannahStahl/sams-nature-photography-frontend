import React from 'react';

const Galleries = ({ galleries }) => (
  <div>
    <h1>Photo Galleries</h1>
    <div className="photos">
      {galleries.map((gallery) => (
        <a
          href={`/photos/${gallery._id}`}
          key={gallery._id}
          className="photo"
        >
          <img
            src={gallery.previewPhoto.asset.url}
            alt={gallery.name}
            className="photo-img"
          />
          <h3>{gallery.name}</h3>
        </a>
      ))}
    </div>
  </div>
);

export default Galleries;
