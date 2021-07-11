import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Context from './Context';
import EnlargedPhoto from './EnlargedPhoto';

const Gallery = ({ match }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [photoDetailsVisible, setPhotoDetailsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  let gallery;

  const handleKeyDown = useCallback((e) => {
    if (modalOpen) {
      if (e.keyCode === 37) {
        if (index > 0) setIndex(index - 1);
      } else if (e.keyCode === 39) {
        if (index < gallery.photos.length - 1) setIndex(index + 1);
      }
    }
  }, [modalOpen, index, gallery]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setPhotoDetailsVisible(false);
  }, [index, modalOpen]);

  const { galleries } = useContext(Context);
  if (galleries.length === 0 || !match) return <></>;

  const { params: { gallerySlug } } = match;
  gallery = galleries.find(({ slug: { current } }) => current === gallerySlug);
  if (!gallery) return <Redirect to="/page-not-found" />;

  const selectedPhoto = gallery.photos[index];
  const { title, description, image: { asset: { url } } } = selectedPhoto;
  const image = new Image();
  image.src = url;
  const imageWidthToHeightRatio = image.naturalWidth / image.naturalHeight;
  const windowWidthToHeightRatio = window.innerWidth / window.innerHeight;
  let width;
  let height;
  if (imageWidthToHeightRatio > windowWidthToHeightRatio) {
    width = window.innerWidth - 85;
    height = width / imageWidthToHeightRatio;
  } else {
    height = window.innerHeight - 85;
    width = height * imageWidthToHeightRatio;
  }

  return (
    <div>
      <h2>{gallery.name}</h2>
      <div className="photos">
        {gallery.photos.map((photo, i) => (
          <div
            key={photo.title}
            className="photo"
            onClick={() => {
              setIndex(i);
              setModalOpen(true);
            }}
          >
            <img
              src={photo.image.asset.url}
              alt={photo.title}
              className="photo-img"
            />
          </div>
        ))}
      </div>
      <Modal
        centered
        animation={false}
        dialogAs={(props) => <EnlargedPhoto style={{ width, height }} {...props} />}
        show={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <div className="enlarged-photo-with-details">
          <img className="enlarged-photo" src={url} alt={title} />
          <div className={`photo-details${photoDetailsVisible ? ' visible' : ''}`}>
            <h4>{title}</h4>
            {description && <p>{description}</p>}
          </div>
          <i className="photo-details-icon fas fa-info-circle" onClick={() => setPhotoDetailsVisible(!photoDetailsVisible)} />
        </div>
        {index > 0 && (
          <img src='/previous.png' alt="Previous" className="previous" onClick={() => setIndex(index - 1)} />
        )}
        {index < gallery.photos.length - 1 && (
          <img src='/next.png' alt="Next" className="next" onClick={() => setIndex(index + 1)} />
        )}
        <img src='/exit.png' alt="Close" className="exit" onClick={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Gallery;
