import React, { useContext } from 'react';
import { Context } from '..';

const Galleries = () => {
  const { galleries } = useContext(Context);
  return (
    <div>
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
            <h4>{gallery.name}</h4>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Galleries;
