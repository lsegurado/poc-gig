import { render, fireEvent, screen } from '../../jest';
import { mockState, withASelectedContact } from '../../__fixtures__';
import { EditContact } from './';
import { useAppDispatch } from '../../hooks';
import { saveContact } from '../../slices';
import { SaveableContact } from '../../types';

describe('EditContact component', () => {
  const onClose = jest.fn();
  describe('when selectedContact is not present', () => {
    beforeEach(() => {
      render(<EditContact open onClose={onClose} />)
    })
    test('renders the component with correct title', () => {
      const titleElement = screen.getByText('New Contact');
      expect(titleElement).toBeDefined();
    });
  })
  test('calls onClose function when Cancel button is clicked', () => {
    render(
      <EditContact open onClose={onClose} />
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });
  
  describe('when selectedContact is present', () => {
    beforeEach(() => {
      mockState.mockReturnValue(withASelectedContact);
      render(<EditContact open onClose={onClose} />)
    })
    test('renders the component with correct title', () => {
      const titleElement = screen.getByText('Edit Contact');
      expect(titleElement).toBeDefined();
    });

    test('calls handleSaveContact function and onClose function when Save Contact button is clicked', () => {
      const dispatch = useAppDispatch();
      const saveButton = screen.getByText('Save Contact');
      fireEvent.click(saveButton);
      expect(dispatch).toHaveBeenCalledWith(saveContact(withASelectedContact.contacts.selectedContact as SaveableContact));
      expect(onClose).toHaveBeenCalled();
    });
  })
});