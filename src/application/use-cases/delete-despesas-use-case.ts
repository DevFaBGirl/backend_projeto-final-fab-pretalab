import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class DeleteDespesaUseCase {
    constructor(
        private despesaRepository: DespesaRepository,
    ){}

    async delete(despesaId: string) {
        const despesa = await this.despesaRepository.findById(despesaId);
        if (!despesa) {
            throw new Error('Despesa not found');
        }
        await this.despesaRepository.delete(despesaId);
        return despesa;
    }
}