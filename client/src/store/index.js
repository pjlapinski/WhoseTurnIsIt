import { createStore, persist } from 'easy-peasy';

export default createStore(
  persist(
    {},
    {
      storage: 'localStorage',
    }
  )
);
