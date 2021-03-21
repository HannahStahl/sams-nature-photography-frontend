import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '..';

const Galleries = () => {
  const { galleries } = useContext(Context);
  return (
    <div>
      <div className="photos">
        {galleries.map((gallery) => (
          <NavLink
            to={`/photos/${gallery.slug.current}`}
            key={gallery._id}
            className="photo"
          >
            <img
              src={gallery.previewPhoto.asset.url}
              alt={gallery.name}
              className="photo-img gallery-img"
            />
            <h4>{gallery.name}</h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Galleries;
