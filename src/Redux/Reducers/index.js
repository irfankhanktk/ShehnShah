import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'commonReducer',
  initialState: {
    firstTimeUSer: false,
    serviceBooking: {
      bookingID: '',
      offeringID: '',
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.firstTimeUSer = action.payload;
    },
    addBookingID: (state, action) => {
      state.serviceBooking.bookingID = action.payload;
    },
    addOfferingID: (state, action) => {
      state.serviceBooking.offeringID = action.payload;
    },
  },
});

export const {addUser, addBookingID, addOfferingID} = commonSlice.actions;
export default commonSlice.reducer;
