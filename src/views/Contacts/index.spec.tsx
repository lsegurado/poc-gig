import { render, screen, fireEvent } from '../../jest';
import { Contacts } from '.';
import { selectContact } from '../../slices';
import { initialAppState } from '../../__fixtures__';
import { useAppDispatch } from '../../hooks';
const expectedContact = initialAppState.contacts.contacts[0];
const expectedContact2 = initialAppState.contacts.contacts[1];

describe('Contacts', () => {
  const dispatch = useAppDispatch();
  beforeEach(() => {
    render(<Contacts />);
  })
  test('displays contacts correctly', () => {
    [expectedContact, expectedContact2].forEach(x => {
      expect(screen.getByText(`${x.firstName} ${x.lastName}`)).toBeDefined();
      expect(screen.getByText(x.email)).toBeDefined();
      expect(screen.getByText(`${x.country.name} (${x.country.code})`)).toBeDefined();
    })
  });

  test('calls selectContact with empty object when "Add contact" button is clicked', () => {
    fireEvent.click(screen.getByText('Add contact'));
    expect(dispatch).toHaveBeenCalledWith(selectContact({}));
  });

  test('calls selectContact with correct contact when a row is clicked', () => {
    fireEvent.click(screen.getByText(expectedContact.email)); // Click on the first contact row
    expect(dispatch).toHaveBeenCalledWith(selectContact(expectedContact));
  });
});