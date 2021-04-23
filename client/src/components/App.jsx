import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeView from './views/home/HomeView';
import RoomView from './views/room/RoomView';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app-h pb-5 bg-secondary'>
        <Route path='/' exact component={HomeView} />
        <Route path='/room' exact component={RoomView} />
      </div>
    </BrowserRouter>
  );
};

export default App;
