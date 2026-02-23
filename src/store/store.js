import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import participantsReducer from './participantsSlice';
import themeReducer from './themeSlice'; 

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    participants: participantsReducer,
    theme: themeReducer, 
  },
});