import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'commonReducer',
  initialState: {
    firstTimeUSer: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.firstTimeUSer = action.payload;
    },
  },
});

export const {addUser} = commonSlice.actions;
export default commonSlice.reducer;
