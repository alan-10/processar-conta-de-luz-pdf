import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { api } from '../api/api';

interface Column {
  id: 'clienteNumber' | 'emitionDate' | 'electricalEnergy' | 'compensatedEnergy';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'clienteNumber', label: 'Número de cliente', minWidth: 170 },
  { id: 'electricalEnergy', label: 'Energia Elétrica', minWidth: 100 },
  {
    id: 'compensatedEnergy',
    label: 'Energia Compensada',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'emitionDate',
    label: 'Data fatura',
    minWidth: 170,
    align: 'right',

  },
];

interface Data {
  clienteNumber: string;
  emitionDate: string;
  electricalEnergy: string;
  compensatedEnergy: string;
}

function createData(
  clienteNumber: string,
  emitionDate: string,
  electricalEnergy: string,
  compensatedEnergy: string,
): Data {

  return { clienteNumber, emitionDate, compensatedEnergy, electricalEnergy };
}



interface InvoiceData {
  id: string;
  numeroClient: string;
  electrical_energy_quantity: string;
  electrical_energy_value: string;
  scee_energy_quantity: string;
  scee_energy_value: string;
  gd_energy_quantity: string;
  gd_energy_value: string;
  emitionDate: string;
  filePath?: string
}

interface Invoice {
  invoices: InvoiceData[]
}






export default function StickyHeadTable({ invoices }: Invoice) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const rows = invoices.map(invoice => {

    const energeElectric = invoice.electrical_energy_value + invoice.scee_energy_value

    return createData(
      invoice.numeroClient,
      invoice.emitionDate,
      energeElectric.toString(),
      invoice.gd_energy_value)
  })


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <h1>Faturas processadas</h1>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.clienteNumber}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}













