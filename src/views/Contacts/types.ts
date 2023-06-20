import { TableCellProps } from "@mui/material";
import { Contact } from "../../types";
import { FC } from "react";

export interface ContactsColumn {
  id: 'name' | 'email' | 'country' | 'actions';
  label?: string;
  headerProps?: TableCellProps
  cellProps?: TableCellProps
  value: FC<Contact>
}