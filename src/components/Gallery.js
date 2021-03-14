import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Context } from '..';
import EnlargedPhoto from './EnlargedPhoto';

const Gallery = ({ match: { params: { galleryId } } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { galleries } = useContext(Context);
  if (galleries.length === 0) return <></>;

  const gallery = galleries.find(({ _id }) => _id === galleryId);
  if (!gallery) return <Redirect to="/page-not-found" />

  const mobile = window.innerWidth < 500 || window.innerHeight < 500;

  const selectedPhoto = gallery.photos[index];
  const { title, image: { asset: { url } } } = selectedPhoto;
  const image = new Image();
  image.src = url;
  const imageWidthToHeightRatio = image.naturalWidth / image.naturalHeight;
  const windowWidthToHeightRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (imageWidthToHeightRatio > windowWidthToHeightRatio) {
    width = window.innerWidth - 50;
    height = width / imageWidthToHeightRatio;
  } else {
    height = window.innerHeight - 50;
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

      {!mobile && (
        <Modal
          centered
          animation={false}
          dialogAs={(props) => <EnlargedPhoto style={{ width, height }} {...props} />}
          show={modalOpen}
          onHide={() => setModalOpen(false)}
        >
          <img src={url} alt={title} />
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
