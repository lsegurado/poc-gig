import { RootState } from "../types"
import { getData } from 'country-list';

const countries = getData();

export const initialAppState: RootState = {
  contacts: {
    contacts: [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', country: countries[1] },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'janesmith@example.com', country: countries[2] },
    ],
    selectedContact: null,
  }
}

export const withASelectedContact: RootState = {
  contacts: {
    ...initialAppState.contacts,
    selectedContact: initialAppState.contacts.contacts[0],
  }
}

export const mockState = jest.fn(() => initialAppState)