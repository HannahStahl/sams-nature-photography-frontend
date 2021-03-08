import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '..';

const Gallery = ({ match: { params: { galleryId } } }) => {
  const { galleries } = useContext(Context);
  if (galleries.length === 0) return <></>;
  const gallery = galleries.find(({ _id }) => _id === galleryId);
  if (!gallery) return <Redirect to="/page-not-found" />
  return (
    <div>
      <h1>{gallery.name}</h1>
      <div className="photos">
        {gallery.photos.map((photo) => (
          <div
            key={photo.title}
            className="photo"
          >
            <img
              src={photo.image.asset.url}
              alt={photo.title}
              className="photo-img"
            />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
