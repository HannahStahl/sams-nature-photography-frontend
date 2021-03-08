import React from 'react';
import content from '../content.json';

const About = () => (
  <div>
    <h2>About</h2>
    <div className="bio">
      {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  </div>
);

export default About;
