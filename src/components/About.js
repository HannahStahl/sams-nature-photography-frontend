import React from 'react';
import content from '../content.json';

const About = () => (
  <div className="about">
    <div className="img-placeholder" />
    <div className="bio">
      {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  </div>
);

export default About;
