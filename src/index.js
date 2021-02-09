import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import About from './components/About';
import Items from './components/Items';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

const Routes = ({ items }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/photos" exact render={() => <Items items={items} />} />
    <Route path="/contact" exact component={Contact} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(() => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const query = `
      query {
        allPhoto {
          _id
          title
          description
          image {
            asset {
              url
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
      .then(({ data: { allPhoto } }) => setItems(allPhoto));
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-content">
        <Routes items={items} />
      </div>
      {window.location.pathname !== '/' && <Footer />}
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();