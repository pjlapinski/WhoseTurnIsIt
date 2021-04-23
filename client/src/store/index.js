import { action, createStore, persist } from 'easy-peasy';

export default createStore(
  persist(
    {
      characterName: '',
      setCharacterName: action((state, payload) => {
        state.characterName = payload;
      }),
    },
    {
      storage: 'localStorage',
    }
  )
);
