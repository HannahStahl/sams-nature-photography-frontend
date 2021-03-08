import React, { useContext } from 'react';
import { Context } from '..';

const Galleries = () => {
  const { galleries } = useContext(Context);
  return (
    <div>
      <h1>Galleries</h1>
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
};

export default Galleries;
