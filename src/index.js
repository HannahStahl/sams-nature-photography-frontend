import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import About from './components/About';
import Galleries from './components/Galleries';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

export const Context = React.createContext({ galleries: [] });

const Routes = () => {
  const routes = [
    { path: "/", Component: Home },
    { path: "/about", Component: About },
    { path: "/photos", Component: Galleries },
    { path: "/photos/:gallerySlug", Component: Gallery },
    { path: "/contact", Component: Contact },
  ];
  return (
    <>
      {routes.map(({ path, Component, props }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match !== null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Component {...props} match={match} />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  );
};

const App = withRouter(({ location }) => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    if (galleries.length === 0) {
      const query = `
        query {
          allGallery(sort: { name: ASC }) {
            _id
            slug {
              current
            }
            name
            previewPhoto {
              asset {
                url
              }
            }
            photos {
              title
              description
              image {
                asset {
                  url
                }
              }
            }
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
        .then(({ data: { allGallery } }) => {
          setGalleries(allGallery);
        });
    }

    return () => {
      document.removeEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    };
  }, [galleries]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <Context.Provider value={{ galleries }}>
      <div className="background-overlay" />
      <NavBar />
      <div className="page-content"><Routes /></div>
      <Footer />
    </Context.Provider>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
