import fs from 'fs';
import path from 'path';
import util from 'util';
import pdfParse from 'pdf-parse';
import { InvoiceService } from './invoiceService';
import { GDEnergyService } from './GDEnergyService';
import { ElectricalEnergyService } from './ElectricalEnergyService';
import { SCEEEnergyService } from './SCEEEnergyService';
import { ErrorHandler } from '../infra/errors/ErrorHandler';


const folderPath = path.resolve(__dirname, '..', '..','faturas');
const readyFilesAsync = util.promisify(fs.readdir);
const readyFileAsync = util.promisify(fs.readFile);

interface IItems {
  item: string;
  quantity: string;
  value: string;
}

interface IInvoices {
  clientNumber: string,
  emissionDate: string,
  energyData: IEnerge[]
}

interface IEnergeValues {
  quantity: string;
  value: string;
}
interface IEnerge {
  EnergiaElectricakWh?: IEnergeValues;
  EnergiaSCEEsICMSkWh?: IEnergeValues;
  EnergiaCompensadaGDIkWh?: IEnergeValues;
}

export class ExtractDataPDFService {

  constructor(
    private invoiceService: InvoiceService,
    private gDEnergyService: GDEnergyService,
    private electricalEnergyService: ElectricalEnergyService,
    private sCEEEnergyService: SCEEEnergyService
  ) { }

  private async getFiles(): Promise<string[]> {

    try {
      console.log('folderPath', folderPath);
      
      const files = await readyFilesAsync(folderPath);

      return files;
    } catch (err) {
      console.error('Erro ao ler a pasta:', err);
      return [];
    }
  }

  private async processFile(file: string): Promise<any> {
    const filePath = path.join(folderPath, file);
    const bufferFile = await readyFileAsync(filePath);
    const { text } = await pdfParse(bufferFile);

    const clientNumber = this.extractClientNumber(text);
    const emissionDate = this.extractEmissionDate(text);
    const energyData = this.extractEnergyData(text);

    return {
      clientNumber,
      emissionDate,
      energyData,
    };
  }

  private extractClientNumber(text: string): string {
    const clientNumberMatch = text.match(/Nº DO CLIENTE[\s\S]*?(\d{10})/);
    return clientNumberMatch ? clientNumberMatch[1] : 'Número do cliente não encontrado';
  }

  private extractEmissionDate(text: string): string {
    const emissionDateInvoiceRegex = /Data de emissão:\s+(\d{2}\/\d{2}\/\d{4})/;
    const emissionDateInvoice = text.match(emissionDateInvoiceRegex);
    return (emissionDateInvoice && Array.isArray(emissionDateInvoice)) ? emissionDateInvoice[1] : 'Data Não encontrada';
  }

  private extractEnergyData(text: string): IItems[] {
    const energyItemsRegex = /(Energia\s.*?)(\d{1,3}(?:\.\d{3})*)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const energyData: IItems[] = [];
    let match;

    while ((match = energyItemsRegex.exec(text)) !== null) {
      const item = match[1].trim();
      const quantity = match[2].trim();
      const value = match[3].trim();
      energyData.push({ item, quantity:quantity, value: value });
    }
    return energyData;
  }

  private formatDataItems(data: IItems): IEnerge {
    return {
      ...(data.item === 'Energia ElétricakWh' && { EnergiaElectricakWh: { quantity: data.quantity, value: data.value } }),
      ...(data.item === 'Energia SCEE s/ ICMSkWh' && { EnergiaSCEEsICMSkWh: { quantity: data.quantity, value: data.value } }),
      ...(data.item === 'Energia compensada GD IkWh' && { EnergiaCompensadaGDIkWh: { quantity: data.quantity, value: data.value } }),
    };
  }

  public async saveExtracDatatInvoices(): Promise<any> {


    const files = await this.getFiles();
   
    const invoices = [];

    for (const file of files) {
      const { clientNumber, emissionDate, energyData } = await this.processFile(file);

      const formattedEnergyData: IEnerge[] = energyData.map(this.formatDataItems);

      const invoice: IInvoices = {
        clientNumber,
        emissionDate,
        energyData: formattedEnergyData,
      };

      invoices.push(invoice);
    }

    if (invoices.length > 0) {

      const saveds = invoices.map(async invoice => {

        const savedInvoice = await this.invoiceService.save({ clientNumber: invoice.clientNumber, emissionDate: invoice.emissionDate })

        const { EnergiaCompensadaGDIkWh } = invoice.energyData.find(invoice => invoice['EnergiaCompensadaGDIkWh']) as IEnerge
        const { EnergiaElectricakWh } = invoice.energyData.find(invoice => invoice['EnergiaElectricakWh']) as IEnerge
        const { EnergiaSCEEsICMSkWh } = invoice.energyData.find(invoice => invoice['EnergiaSCEEsICMSkWh']) as IEnerge

        if (savedInvoice) {
          const [
            gDEnergySAved,
            electricalEnergySaved,
            sCEEEnergySaved
          ] = await Promise.all([
            this.gDEnergyService.save({
              invoiceId: savedInvoice.id, quantity: EnergiaCompensadaGDIkWh?.quantity!,
              value: EnergiaCompensadaGDIkWh?.value!,
            }),
            this.electricalEnergyService.save({
              invoiceId: savedInvoice.id, quantity: EnergiaElectricakWh?.quantity!,
              value: EnergiaElectricakWh?.value!,
            }),
            this.sCEEEnergyService.save({
              invoiceId: savedInvoice.id, quantity: EnergiaSCEEsICMSkWh?.quantity!,
              value: EnergiaSCEEsICMSkWh?.value!,
            })
          ])


          return {
            gDEnergySAved,
            electricalEnergySaved,
            sCEEEnergySaved
          }

        }
        return null

      })

      const resultPromise = await Promise.all(saveds)

      if (resultPromise.length === 1 && resultPromise.includes(null)) {
        throw new ErrorHandler(400, "dont processed invoice")
      }

      return resultPromise;

    } else {
      console.log('Nenhuma fatura encontrada!');
    }

    return invoices;

  }
}
