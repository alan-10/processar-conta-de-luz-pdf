import Button from '@mui/material/Button';
import TableComponent from '../components/TableComponents';
import { useEffect, useState } from "react";
import { api } from '../api/api';
import ChartComponent from '../components/ChartComponent';
import { AppBarComponent } from '../components/AppBarComponent';

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

export function Home() {

  const [invoices, setInvoice] = useState<InvoiceData[]>([]);
  const [loadComponent, setLoadComponent] = useState(true)

  useEffect(() => {
    api.get("/getInvoicesExtracted")
      .then(data => {
        setInvoice(data.data.invoices)
      })
  }, [loadComponent])

  function processInvoice() {
    api.post('/saveExtracDatatInvoices').then(() => {
      setLoadComponent(prevState => !prevState);
    })

  }

  return (
    <>
      <AppBarComponent />
      <div className='mt-4  p-2'>
        <Button variant="contained" className='m-auto' onClick={processInvoice}>
          Processar faturas
        </Button>
        <div className='flex w-100% gap-2 mt-4 '>
          {invoices.length > 0 && (
            <>
              <div className='bg-blue'>
                {invoices.length > 0 ? <TableComponent invoices={invoices} /> : 'Sem faturas'}
              </div>
              <div className=''>
                <ChartComponent invoices={invoices} />
              </div>
            </>
          )}


        </div>
      </div>
    </>
  );
}