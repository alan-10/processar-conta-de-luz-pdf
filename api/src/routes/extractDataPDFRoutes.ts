import { Router } from 'express';

const extractDataPDFRoutes = Router();

import { ExtractDataPDFController } from '../controller/ExtractDataPDFController';
import { ExtractDataPDFService} from '../service/ExtractDataPDFService'

import {  InvoiceService} from '../service/invoiceService';
import { InvoiceRepository } from '../repository/InvoiceRepository';
import { AppDataSource } from '../data-source';

import {GDEnergyService } from '../service/GDEnergyService'
import { GDEnergyRepository }  from '../repository/GDEnergyRepository';

import { SCEEEnergyRepository } from '../repository/SCEEEnergyRepository';
import { SCEEEnergyService } from '../service/SCEEEnergyService'

const invoiceRepository = new InvoiceRepository(AppDataSource);
const invoiceService = new InvoiceService(invoiceRepository);

const gDEnergyRepository = new GDEnergyRepository(AppDataSource);
const gDEnergyService = new GDEnergyService(gDEnergyRepository);


const sCEEEnergyRepository = new SCEEEnergyRepository(AppDataSource);
const sCEEEnergyService = new SCEEEnergyService(sCEEEnergyRepository);


import { ElectricalEnergyRepository } from '../repository/ElectricalEnergyRepository';
import { ElectricalEnergyService } from '../service/ElectricalEnergyService'


const electricalEnergyRepository = new ElectricalEnergyRepository(AppDataSource);
const electricalEnergyService =  new ElectricalEnergyService(electricalEnergyRepository);


const extractDataPDFService = new ExtractDataPDFService(invoiceService
  ,gDEnergyService, electricalEnergyService, sCEEEnergyService );

  
const extractDataPDFController = new ExtractDataPDFController(extractDataPDFService, invoiceService);


extractDataPDFRoutes.post('/saveExtracDatatInvoices', extractDataPDFController.saveExtracDatatInvoices.bind(extractDataPDFController));
extractDataPDFRoutes.get('/getInvoicesExtracted', extractDataPDFController.getExtactedDataInvoice.bind(extractDataPDFController));


export { extractDataPDFRoutes }


