import { Repository, DataSource } from 'typeorm';
import { Invoice } from '../entities/Invoice';


export class InvoiceRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }


  public async getcompleteDataInvoice() {
    const result = await this.dataSource.query(` SELECT 
    i.*,
    gd."quantity" AS "gd_energy_quantity",
    gd."value" AS "gd_energy_value" ,
    ee."quantity" AS "electrical_energy_quantity",
    ee."value" AS "electrical_energy_value",
    se."quantity" AS "scee_energy_quantity",
    se."value" AS "scee_energy_value"
    FROM invoice AS i
    JOIN gd_energy AS gd ON gd."invoiceId" = i."id"
    JOIN electrical_energy AS ee ON ee."invoiceId" = i."id"
    JOIN scee_energy AS se ON se."invoiceId" = i."id"
    `,)
    return result;
  }

}