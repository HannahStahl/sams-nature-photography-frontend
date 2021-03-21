import React from 'react';
import content from '../content.json';
import config from '../config';

const About = () => (
  <div className="about">
    <img className="about-photo" src={`${config.publicCloudfrontURL}/sam-johnson.jpg`} />
    <div className="bio">
      {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  </div>
);

export default About;
