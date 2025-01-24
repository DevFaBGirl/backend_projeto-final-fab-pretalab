import { Despesa } from '../../domain/despesa';
import { DespesaRepository } from '../repositores/depesa-repository';

export class CreateDespesaUseCase {
    constructor(
        private despesaRepository: DespesaRepository,
    ){}

    async execute(despesaParams: Partial<Despesa>): Promise<Despesa> {
        const despesa = {
          ...despesaParams,
        } as Despesa;
      
        await this.despesaRepository.save(despesa);
        return despesa;
      }
      
}