import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectSelectedContact, saveContact, saveSelectedContact } from "../../slices";
import { CountrySelect } from "../../components/CountrySelect";
import { Contact } from "../../types";
import { isSaveableContact } from "../../typeGuards/isValidContact";
import { FORM_NAME } from "./constants";

export interface EditContactProps extends DialogProps {
  onClose(): void
}

export const EditContact: FC<EditContactProps> = (props) => {
  const selectedContact = useAppSelector(selectSelectedContact);
  const dispatch = useAppDispatch();

  const handleSaveContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaveableContact(selectedContact))
      dispatch(saveContact(selectedContact))
    props.onClose?.();
  }
  const updateSelectedContact = <T extends keyof Contact>(key: T, value: Contact[T] | null) => {
    if (selectedContact)
      dispatch(saveSelectedContact({
        ...selectedContact,
        [key]: value
      }))
  }

  const handleCancel = () => {
    props.onClose?.();
  }

  return (
    <Dialog {...props}>
      <DialogTitle>{selectedContact ? 'Edit Contact' : 'New Contact'}</DialogTitle>
      <DialogContent>
        <form id={FORM_NAME} onSubmit={handleSaveContact}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            value={selectedContact?.firstName ?? ''}
            onChange={(e) => updateSelectedContact('firstName', e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            value={selectedContact?.lastName ?? ''}
            onChange={(e) => updateSelectedContact('lastName', e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            inputProps={{
              title:"Insert a valid email",
              /**
               * It does not contain any whitespace characters;
               * It has a single @ symbol
               * It has at least one character before and after the @ symbol
               * It has at least one character after the last dot (.) in the domain
               */
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            }}
            value={selectedContact?.email ?? ''}
            onChange={(e) => updateSelectedContact('email', e.target.value)}
            required
          />
            <CountrySelect textFieldProps={{ required: true, margin: 'normal' }} value={selectedContact?.country ?? null} onChange={(_, newValue) => updateSelectedContact('country', newValue)} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form={FORM_NAME}>
          Save Contact
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}