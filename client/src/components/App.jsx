import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeView from './views/home/HomeView';
import RoomView from './views/room/RoomView';
import config from '../config';

setTimeout(() => {
  fetch(config.SERVER_HOST).then(res => console.log('KeepAlive: ', res.ok));
}, 1000 * 60);

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-h pb-5 bg-secondary'>
        <Switch>
          <Route path='/' exact>
            <HomeView />
          </Route>
          <Route path='/room/:id'>
            <RoomView />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
