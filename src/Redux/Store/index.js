import {configureStore} from '@reduxjs/toolkit';
import CommonSlice from '../Reducers';
export const store = configureStore({
  reducer: {
    common: CommonSlice,
  },
});
