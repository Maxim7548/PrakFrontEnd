import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter, 
  createSelector 
} from '@reduxjs/toolkit';

export const participantsAdapter = createEntityAdapter();

export const fetchParticipants = createAsyncThunk(
  'participants/fetchParticipants',
  async (eventId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = [
        { id: '1', name: "Олександр Петренко", email: "alex.p@gmail.com" },
        { id: '2', name: "Марія Іваненко", email: "maria.iv@ukr.net" },
        { id: '3', name: "Сергій Гончаренко", email: "serg.gonch@gmail.com" },
        { id: '4', name: "Катерина Сидоренко", email: "kat.sidor@gmail.com" },
        { id: '5', name: "Дмитро Коваленко", email: "dmitro.kov@gmail.com" }
      ];

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const importExternalParticipants = createAsyncThunk(
  'participants/importExternal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Помилка імпорту');
      const data = await response.json();
      
      return data.map(user => ({
        id: `ext_${user.id}`, 
        name: user.name,
        email: user.email
      }));
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
      })

      .addCase(importExternalParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importExternalParticipants.fulfilled, (state, action) => {
        state.loading = false;

        participantsAdapter.addMany(state, action.payload); 
      })
      .addCase(importExternalParticipants.rejected, (state) => {
        state.loading = false;
        state.error = "Помилка імпорту з зовнішнього API";
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