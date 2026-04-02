import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const participantsAdapter = createEntityAdapter({
  selectId: (participant) => participant._id 
});

export const fetchParticipants = createAsyncThunk(
  'participants/fetchParticipants',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://event-gallery-backend.onrender.com/participants/${eventId}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Помилка завантаження');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const participantsSlice = createSlice({
  name: 'participants',
  initialState: participantsAdapter.getInitialState({
    loading: false,
    error: null,
    searchQuery: ''
  }),
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        participantsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка завантаження";
      });
  }
});

export const { setSearchQuery } = participantsSlice.actions;

export const { selectAll: selectAllParticipants } = participantsAdapter.getSelectors(
  (state) => state.participants
);

export const selectFilteredParticipants = createSelector(
  [selectAllParticipants, (state) => state.participants.searchQuery],
  (participants, query) => {
    if (!query) return participants;
    const lower = query.toLowerCase();
    return participants.filter(p => 
      p.name.toLowerCase().includes(lower) || 
      p.email.toLowerCase().includes(lower)
    );
  }
);

export default participantsSlice.reducer;