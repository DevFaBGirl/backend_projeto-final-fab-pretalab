import { DespesaRepository } from '../repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';

export class GetDespesasByUserUseCase {
    constructor(
        private despesaRepository: DespesaRepository
    ) {}

    async execute(userId: string): Promise<Despesa | null> {
        const despesasByUser = await this.despesaRepository.findById(userId);
        return despesasByUser;
    }

    async find(): Promise<Array<Despesa>> {
        const allDespesas = await this.despesaRepository.findAll();
        return allDespesas;
    }
}