import { Invoice } from "../entities/Invoice";
import { SCEEEnergyRepository } from "../repository/SCEEEnergyRepository";



interface SCEEEnergy {
  invoiceId: string;
  quantity: string;
  value: string;
}
export class SCEEEnergyService {

  constructor(private sCEEEnergyRepository: SCEEEnergyRepository) { }

  public async save(data: SCEEEnergy) {
    const SCEEEnergyCreated = await this.sCEEEnergyRepository.save({
      invoice: { id: data.invoiceId } as Invoice,
      quantity: data.quantity,
      value: data.value,
    })

    return SCEEEnergyCreated;
  }

}