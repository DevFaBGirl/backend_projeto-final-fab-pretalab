import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class UpdateDespesaUseCase {
  constructor(private despesaRepository: DespesaRepository) {}

  async execute(despesaId: string, updates: Partial<Despesa>): Promise<Despesa> {
    // Busca a despesa pelo ID
    const despesa = await this.despesaRepository.findById(despesaId);

    if (!despesa) {
      throw new Error('Despesa não encontrada.');
    }

    // Atualiza somente os campos fornecidos no objeto 'updates'
    const updatedDespesa = {
      ...despesa,
      ...updates,
    };

    // Salva a despesa atualizada no repositório
    await this.despesaRepository.save(updatedDespesa);

    return updatedDespesa;
  }
}
