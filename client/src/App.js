import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header';
import Browse from './components/Browse';
import Album from './components/Album';
import Artist from './components/Artist';
import Search from './components/SearchResults';
import Playlists from './components/Playlists';
import Playlist from './components/Playlist';
import Footer from './components/Footer';
import DatabaseError from './components/common/DatabaseError';
import './sass/main.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <Header />
            <Switch>
              <Route exact path={'/'} component={Browse} />
              <Route exact path={'/album'} component={Album} />
              <Route exact path={'/artist'} component={Artist} />
              <Route exact path={'/search'} component={Search} />
              <Route exact path={'/playlists'} component={Playlists} />
              <Route exact path={'/playlists/:playlist'} component={Playlist} />
              <Route exact path={'/error'} component={DatabaseError} />
              <Redirect to='/' />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
