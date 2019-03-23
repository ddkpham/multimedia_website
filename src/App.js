import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import classes from './App.module.css';
import Layout from './component/Layout/Layout'


import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Layout>
          
          </Layout>
          <footer className={classes.Footer}>
            <p>Copyright &copy;2018 Design by David Pham | Subin Bae | Paul Miller</p>
          </footer>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
