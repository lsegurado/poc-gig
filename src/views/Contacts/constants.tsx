import { ContactsColumn } from "./types";
import { ContactsActions } from "./components/ContactsActions";

export const COLUMNS: readonly ContactsColumn[] = [
  {
    id: 'name',
    label: 'Name',
    value(contact) {
      return `${contact.firstName} ${contact.lastName}`
    }
  },
  {
    id: 'email',
    label: 'Email',
    value(contact) {
      return contact.email
    }
  },
  {
    id: 'country',
    label: 'Country',
    value(contact) {
      return `${contact.country.name} (${contact.country.code})`
    }
  },
  {
    id: 'actions',
    value: ContactsActions
  }
];