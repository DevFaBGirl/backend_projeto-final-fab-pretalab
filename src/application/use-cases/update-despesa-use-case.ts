//use case de atualização-update
import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class UpdateDespesaUseCase {
  constructor(private despesaRepository: DespesaRepository) {}

  async execute(despesaId: string, updates: Partial<Despesa>): Promise<Despesa> {
   
    const despesa = await this.despesaRepository.findById(despesaId);

    if (!despesa) {
      throw new Error('Despesa não encontrada.');
    }
    
    const updatedDespesa = {
      ...despesa,
      ...updates,
    };
    
    await this.despesaRepository.save(updatedDespesa);

    return updatedDespesa;
  }
}
