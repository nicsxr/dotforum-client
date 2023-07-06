import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  auth: null,
  loading: true,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.auth = true;
      state.loading = false;
      state.user = action.payload;
    },
    userRemoved: (state) => {
      state.auth = false;
      state.loading = false;
      state.user = null;
    },
    // Other reducers go here
  },
});
export const { userLoaded, userRemoved } = authSlice.actions;
export default authSlice.reducer;