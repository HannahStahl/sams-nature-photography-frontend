import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import About from './components/About';
import Galleries from './components/Galleries';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

const Routes = ({ galleries }) => (
  <Switch>
    <Route path="/" exact render={() => <Galleries galleries={galleries} />} />
    <Route path="/about" exact component={About} />
    <Route path="/photos" exact render={() => <Galleries galleries={galleries} />} />
    <Route path="/contact" exact component={Contact} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(() => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    if (galleries.length === 0) {
      const query = `
        query {
          allPhoto(sort: { _updatedAt: DESC }) {
            _id
            title
            description
            image {
              asset {
                url
              }
            }
            gallery {
              _id
            }
          }
          allGallery(sort: { _updatedAt: DESC }) {
            _id
            name
          }
        }
      `;
      const params = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      };
      fetch(config.apiURL, params)
        .then((res) => res.json())
        .then(({ data: { allPhoto, allGallery } }) => {
          allGallery.forEach((gallery, index) => {
            allGallery[index].photos = allPhoto.filter((photo) => photo.gallery._id === gallery._id);
          });
          setGalleries(allGallery);
        });
    }
  }, [galleries]);

  return (
    <>
      <NavBar />
      <div className="page-content">
        <Routes galleries={galleries} />
      </div>
      <Footer />
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
