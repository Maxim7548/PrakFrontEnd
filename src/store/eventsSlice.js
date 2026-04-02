import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (cursor = null, { rejectWithValue }) => {
    try {
      const baseUrl = 'https://event-gallery-backend.onrender.com/events/scroll';
      const url = cursor ? `${baseUrl}?cursor=${cursor}` : baseUrl;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(result.error || 'Помилка сервера');
      }
      
      return { data: result.data, isLoadMore: !!cursor };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [], 
    registeredIds: [],
    status: 'idle',
    hasMore: true, 
    error: null 
  },
  reducers: {
    registerForEvent(state, action) {
      const eventId = action.payload; 
      if (!state.registeredIds.includes(eventId)) {
        state.registeredIds.push(eventId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newEvents = action.payload.data;
        
        if (!newEvents) return; 

        if (newEvents.length < 2) {
            state.hasMore = false;
        }

        if (action.payload.isLoadMore) {
          state.items = [...state.items, ...newEvents];
        } else {
          state.items = newEvents;
        }
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  }
});

export const { registerForEvent } = eventsSlice.actions;
export default eventsSlice.reducer;