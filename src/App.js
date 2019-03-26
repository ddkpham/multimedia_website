import React, { Component } from 'react';
import {HashRouter} from 'react-router-dom';

import classes from './App.module.css';
import Layout from './component/Layout/Layout'


import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className={classes.App}>
          <Layout>
          
          </Layout>
          <footer className={classes.Footer}>
            <p>Copyright &copy;2019 Design by David Pham | Subin Bae | Paul Miller</p>
          </footer>
        </div>
      </HashRouter>
      
    );
  }
}

export default App;
