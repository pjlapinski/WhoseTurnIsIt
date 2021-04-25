import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeView from './views/home/HomeView';
import RoomView from './views/room/RoomView';

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
