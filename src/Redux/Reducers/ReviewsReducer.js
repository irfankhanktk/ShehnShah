import {createSlice} from '@reduxjs/toolkit';

const businessReviews = createSlice({
  name: 'businessReviews',
  initialState: {
    businessReviews: [],
  },
  reducers: {
    addReviews: (state, action) => {
      state.businessReviews = action.payload;
    },
  },
});

export const {addReviews} = businessReviews.actions;
export default businessReviews.reducer;
