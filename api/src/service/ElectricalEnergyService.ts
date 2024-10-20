import { Invoice } from "../entities/Invoice";
import { ElectricalEnergyRepository } from "../repository/ElectricalEnergyRepository";

interface Electrical {
  invoiceId: string;
  quantity: string;
  value: string;
}

export class ElectricalEnergyService {
  constructor(private electricalEnergyRepository: ElectricalEnergyRepository) { }

  public async save(data: Electrical) {
    const eletricalCreated = await this.electricalEnergyRepository.save({
      invoice: { id: data.invoiceId } as Invoice,
      quantity: data.quantity,
      value: data.value,
    })

    return eletricalCreated;
  }
}