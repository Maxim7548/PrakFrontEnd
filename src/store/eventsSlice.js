import { createSlice } from '@reduxjs/toolkit';
import { eventsData } from '../data/events'; 

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: eventsData, 
    registeredIds: [],
  },
  reducers: {
    registerForEvent(state, action) {
      const eventId = action.payload; 
      if (!state.registeredIds.includes(eventId)) {
        state.registeredIds.push(eventId);
      }
    }
  }
});

export const { registerForEvent } = eventsSlice.actions;
export default eventsSlice.reducer;