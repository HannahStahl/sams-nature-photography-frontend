import React from 'react';
import { ModalDialog } from 'react-bootstrap';

const Photo = ({ style, ...props }) => (
  <div className="enlarged-photo-wrapper">
    <div style={style}>
      <ModalDialog {...props} />
    </div>
  </div>
);

export default Photo;
