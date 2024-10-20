import { Response, Request } from 'express'
import { ExtractDataPDFService } from '../service/ExtractDataPDFService';
import { InvoiceService } from '../service/invoiceService';

export class ExtractDataPDFController {

  constructor(private extractDataPDFService: ExtractDataPDFService, private invoiceService: InvoiceService) { }

  public async saveExtracDatatInvoices(request: Request, response: Response) {

    const totalExtract = await this.extractDataPDFService.saveExtracDatatInvoices();
    response.json({ created: totalExtract.length })
  }

  public async getExtactedDataInvoice(request: Request, response: Response) {

    const invoices = await this.invoiceService.getExtactedDataInvoice();

    response.json({ invoices: invoices });
  }

}

