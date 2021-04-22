import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../store';
import HomeView from './views/home/HomeView';
import RoomView from './views/room/RoomView';

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className='app-h pb-5 bg-secondary'>
          <Route path='/' exact component={HomeView} />
          <Route path='/room' exact component={RoomView} />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
