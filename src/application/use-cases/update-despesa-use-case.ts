import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class UpdateDespesaUseCase {
  constructor(private despesaRepository: DespesaRepository) {}

  async execute(despesaId: string, updates: Partial<Despesa>): Promise<Despesa> {
   
    const despesa = await this.despesaRepository.findById(despesaId);

    console.log('Despesa:', despesa);

    if (!despesa) {
      throw new Error('Despesa não encontrada.');
    }
    
    const updatedDespesa: Despesa = {
      ...despesa,
      ...updates,
      id: despesaId,
    };
    
    await this.despesaRepository.update(despesaId, updatedDespesa);

    if(!updatedDespesa) {
      throw new Error('Erro ao atualizar a despesa.');
    }

    return updatedDespesa;
  }
}
