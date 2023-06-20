import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types';
import { Contact, SaveableContact } from '../../types';
import { v4 as uuidv4 } from 'uuid';

type SelectedContact = Partial<Contact> | null;

export interface contactsState {
  contacts: Contact[];
  selectedContact: SelectedContact;
}

const STORAGE_KEY = 'contacts'

const storageItems = localStorage.getItem(STORAGE_KEY);

const initialContacts = storageItems ? JSON.parse(storageItems) : []

export const initialState: contactsState = {
  contacts: initialContacts,
  selectedContact: null,
};

/**
 * A slice of the contacts and their asynchronous operations
 */
const contactsSlice = createSlice({
  name: STORAGE_KEY,
  initialState,
  reducers: {
    saveContact: (state, action: PayloadAction<SaveableContact>) => {
      if (action.payload.id) {
        const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload as Contact;
        }
      } else {
        state.contacts.push({ ...action.payload, id: uuidv4() });
      }
      saveContactsToLocalStorage(state.contacts)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      saveContactsToLocalStorage(state.contacts)
    },
    selectContact: (state, action: PayloadAction<SelectedContact>) => {
      state.selectedContact = action.payload;
    },
    saveSelectedContact: (state, action: PayloadAction<SelectedContact>) => {
      state.selectedContact = action.payload;
    },
  },
});

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const { saveContact, deleteContact, selectContact, saveSelectedContact } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectSelectedContact = (state: RootState) => state.contacts.selectedContact;

export const contactsReducer = contactsSlice.reducer;