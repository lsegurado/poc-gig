import { Box, Fab, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Add, Person } from "@mui/icons-material";
import { FC, useState } from "react";
import { COLUMNS } from "./constants";
import { selectContact, selectContacts, selectSelectedContact } from "../../slices";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Header } from "../../components/Header";
import { EditContact } from "../EditContact";
import { Contact } from "../../types";

export const Contacts: FC = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContact = useAppSelector(selectSelectedContact);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleNewContact = () => dispatch(selectContact({}));
  const handleEditContact = (contact: Contact | null) => dispatch(selectContact(contact));

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Stack sx={{ maxHeight: '100%', height: '100%' }}>
      <Header title="GIG Contacts" left={<Person sx={{ mr: 1 }} />} />
      <Stack direction="row" component="main" sx={{ maxHeight: '100%', height: 'calc(100% - 48px)' }}>
        <Box>
          <Fab size="large" onClick={handleNewContact} variant="extended" color="primary" sx={{ minWidth: '180px', m: 2 }}>
            <Add sx={{ mr: 1 }} />
            Add contact
          </Fab>
        </Box>
        <EditContact open={selectedContact !== null} onClose={() => handleEditContact(null)} />
        <Stack sx={{ width: '100%' }}>
          <TableContainer component="article" sx={{ height: '100%', maxHeight: '100%', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {COLUMNS.map(({ id, label, headerProps }) => (
                    <TableCell
                      key={id}
                      {...headerProps}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer', ':not(:hover) :last-child': { opacity: 0 } }} onClick={() => handleEditContact(contact)} tabIndex={-1} key={contact.id}>
                        {COLUMNS.map(({ id, cellProps, value }) => {
                          const Cell = value;
                          return (
                            <TableCell key={id} {...cellProps} sx={{ border: 'none' }}>
                              <Cell {...contact} />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="footer"
            sx={{ overflow: 'hidden' }}
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>

      </Stack>
    </Stack>
  )
}