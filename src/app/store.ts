import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from '../slices';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer
  },
});