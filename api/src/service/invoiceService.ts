import { InvoiceRepository } from "../repository/InvoiceRepository";
import { convertDate } from "../utils/converterDate";

interface IItems {
  item: string;
  quantity: Number;
  value: Number;
}

interface IInvoices {
  clientNumber: string,
  emissionDate: string,

}

interface SavedInvoice {
  emitionDate: string,
  numeroClient: string,
  id: string
}

export class InvoiceService {

  constructor(
    private invoiceRepository: InvoiceRepository
  ) { }

  public async save(invoice: IInvoices): Promise<SavedInvoice | null> {

    const existsInvoice = await this.invoiceRepository.find({
      where: {
        numeroClient: invoice.clientNumber,
        emitionDate: new Date(convertDate(invoice.emissionDate))
      }
    })

    if (existsInvoice.length > 0) {
      return null;
    }

    const invoiceCreated = await this.invoiceRepository.save({
      emitionDate: convertDate(invoice.emissionDate),
      numeroClient: invoice.clientNumber
    });

    return invoiceCreated;
  }

  public async getExtactedDataInvoice(){
    const result = await this.invoiceRepository.getcompleteDataInvoice();
    return result;
  }


}