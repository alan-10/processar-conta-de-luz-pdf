import { Invoice } from "../entities/Invoice";
import { GDEnergyRepository } from "../repository/GDEnergyRepository";

interface SaveSCEEEnergy {
  invoiceId: string;
  quantity: string;
  value: string;
}

export class GDEnergyService {

  constructor(private gDEnergyRepository: GDEnergyRepository) { }

  public async save(data: SaveSCEEEnergy) {

    const SaveSCEEESaved = await this.gDEnergyRepository.save({
      invoice: { id: data.invoiceId } as Invoice,
      quantity: data.quantity,
      value: data.value,
    });

    return SaveSCEEESaved;
  }

}