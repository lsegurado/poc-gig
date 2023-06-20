import { contactsReducer, deleteContact, initialState, saveContact, selectContact } from ".";
import { Contact } from "../../types";
import { initialAppState } from "../../__fixtures__";

const contact = initialAppState.contacts.contacts[0]

describe('contactsSlice', () => {
  test('should handle initial state', () => {
    expect(contactsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  test('saveContact action adds a new contact to the state', () => {
    const state = contactsReducer(initialState, saveContact({ ...contact, id: undefined }));

    expect(state.contacts).toHaveLength(1);
  });

  test('saveContact action updates an existing contact in the state', () => {
    const updatedContact: Contact = { ...contact, lastName: 'Smith' };
    const state = contactsReducer(initialAppState.contacts, saveContact(updatedContact));
    expect(state.contacts).toHaveLength(initialAppState.contacts.contacts.length);
    expect(state.contacts[0]).toEqual(updatedContact);
  });

  test('deleteContact action removes a contact from the state', () => {
    const state = contactsReducer(initialAppState.contacts, deleteContact(contact.id));
    expect(state.contacts).toHaveLength(1);
    expect(state.contacts[0]).toEqual(initialAppState.contacts.contacts[1]);
  });

  test('selectContact action sets the selected contact in the state', () => {
    const state = contactsReducer(initialAppState.contacts, selectContact(contact));
    expect(state.selectedContact).toEqual(contact);
  });
});