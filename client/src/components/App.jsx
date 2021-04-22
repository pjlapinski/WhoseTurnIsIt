import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../store';
import HomeView from './views/home/HomeView';

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className='vh-100'>
          <Route path='/' exact component={HomeView} />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
