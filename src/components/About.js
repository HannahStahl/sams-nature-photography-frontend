import React, { useContext } from 'react';
import config from '../config';
import Context from './Context';
import PortableText from './PortableText';

const About = () => {
  const { bio } = useContext(Context);
  return (
    <div className="about">
      <img className="about-photo" src={`${config.publicCloudfrontURL}/sam-johnson.jpg`} alt="Sam Johnson" />
      <div className="bio">
        <PortableText text={bio} />
      </div>
    </div>
  );
};

export default About;
