import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'commonReducer',
  initialState: {
    firstTimeUSer: false,
    customerData: [],
    serviceBooking: {
      bookingID: 0,
      offeringID: 0,
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
    customerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const {addUser, customerData, addBookingID, addOfferingID} =
  commonSlice.actions;
export default commonSlice.reducer;
