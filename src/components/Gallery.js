import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Context } from '..';
import EnlargedPhoto from './EnlargedPhoto';

const Gallery = ({ match: { params: { gallerySlug } } }) => {
  const [modalOpen, setModalOpen] = useState(false);
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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const { galleries } = useContext(Context);
  if (galleries.length === 0) return <></>;

  gallery = galleries.find(({ slug: { current } }) => current === gallerySlug);
  if (!gallery) return <Redirect to="/page-not-found" />;

  const mobile = window.innerWidth < 500 || window.innerHeight < 500;

  const selectedPhoto = gallery.photos[index];
  const { title, description, image: { asset: { url } } } = selectedPhoto;
  const image = new Image();
  image.src = url;
  const imageWidthToHeightRatio = image.naturalWidth / image.naturalHeight;
  const windowWidthToHeightRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (imageWidthToHeightRatio > windowWidthToHeightRatio) {
    width = window.innerWidth - 150;
    height = width / imageWidthToHeightRatio;
  } else {
    height = window.innerHeight - 150;
    width = height * imageWidthToHeightRatio;
  }

  const closeModal = () => {
    const enlargedPhoto = document.getElementById("enlarged-photo-with-details");
    const leftArrow = document.getElementById("previous");
    const rightArrow = document.getElementById("next");
    const exitIcon = document.getElementById("exit");
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    enlargedPhoto.classList.add('fade-out');
    if (leftArrow) leftArrow.classList.add('fade-out');
    if (rightArrow) rightArrow.classList.add('fade-out');
    exitIcon.classList.add('fade-out');
    modalBackdrop.classList.add('fade-out');
    setTimeout(() => setModalOpen(false), 250);
  };

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

      {!mobile && (
        <>
          <Modal
            centered
            animation={false}
            dialogAs={(props) => <EnlargedPhoto style={{ width, height }} {...props} />}
            show={modalOpen}
            onHide={closeModal}
          >
            <div id="enlarged-photo-with-details" className="enlarged-photo-with-details">
              <img className="enlarged-photo" src={url} alt={title} />
              <div className="photo-details">
                <h4>{title}</h4>
                {description && <p>{description}</p>}
              </div>
            </div>
            {index > 0 && (
              <img src='/previous.png' alt="Previous" id="previous" className="previous" onClick={() => setIndex(index - 1)} />
            )}
            {index < gallery.photos.length - 1 && (
              <img src='/next.png' alt="Next" id="next" className="next" onClick={() => setIndex(index + 1)} />
            )}
            <img src='/exit.png' alt="Close" id="exit" className="exit" onClick={closeModal} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Gallery;
