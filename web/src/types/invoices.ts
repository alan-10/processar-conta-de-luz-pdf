export interface InvoiceData {
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

export interface Invoices {
  invoices: InvoiceData[]
}