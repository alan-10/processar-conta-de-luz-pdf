import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BarChartComponent } from './BarChartComponent';


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
}

interface Invoice {
  invoices: InvoiceData[]
}


export default function ChartComponent({ invoices }: Invoice) {
  const [client, setClient] = React.useState('');
  const [clientFiltered, setClientFiltered] = React.useState<InvoiceData[]>([]);

  const numbersClient = invoices.map(invoice => invoice.numeroClient);

  const numbersClientWithoutDuplication = [...new Set(numbersClient)];

  const handleChange = (event: SelectChangeEvent) => {

    const clienteFilted = invoices.filter(invoice => invoice.numeroClient == event.target.value);
    if (clienteFilted) {
      setClientFiltered(clienteFilted)

    }
    setClient(event.target.value as string);
  };


  return (
    <>
      <Box sx={{ minWidth: 400 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Número do cliente</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={client}
            label="Número do cliente"
            onChange={handleChange}
          >
            {numbersClientWithoutDuplication.map(invoice => (
              <MenuItem value={invoice}>{invoice}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </Box>

      {clientFiltered.length > 0 && (
       <div className='mt-8'>
        <BarChartComponent invoices={clientFiltered} />
       </div>
      )}

    </>

  );
}
