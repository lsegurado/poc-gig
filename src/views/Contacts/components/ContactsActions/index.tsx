import { IconButton, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../../../hooks";
import { deleteContact, selectContact } from "../../../../slices";
import { Delete, Edit } from "@mui/icons-material";
import { Contact } from "../../../../types";
import { FC } from "react";

export const ContactsActions: FC<Contact> = (contact) => {
  const dispatch = useAppDispatch();
  const handleEditContact = () => dispatch(selectContact(contact));
  const handleDeleteContact = () => dispatch(deleteContact(contact.id));

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={(e) => { e.stopPropagation(); handleEditContact() }}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteContact() }}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  )
}