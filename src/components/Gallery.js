import React from 'react';

const Gallery = ({ galleries, match: { params: { galleryId } } }) => {
  if (galleries.length === 0) return <></>;
  const gallery = galleries.find(({ _id }) => _id === galleryId);
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
