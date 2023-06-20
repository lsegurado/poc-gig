import { render, screen, fireEvent } from '../../../../jest';
import { ContactsActions } from '.';
import { deleteContact, selectContact } from '../../../../slices';
import { initialAppState } from '../../../../__fixtures__';
import { useAppDispatch } from '../../../../hooks';
const expectedContact = initialAppState.contacts.contacts[0];

describe('ContactsActions', () => {
  const dispatch = useAppDispatch();
  beforeEach(() => {
    render(<ContactsActions {...expectedContact} />);
  })
  test('calls selectContact with empty object when "Edit" button is clicked', () => {
    fireEvent.click(screen.getByLabelText('Edit'));
    expect(dispatch).toHaveBeenCalledWith(selectContact(expectedContact));
  });

  test('calls deleteContact with correct contact when "Delete" button is clicked', () => {
    fireEvent.click(screen.getByLabelText('Delete'));
    expect(dispatch).toHaveBeenCalledWith(deleteContact(expectedContact.id));
  });
});