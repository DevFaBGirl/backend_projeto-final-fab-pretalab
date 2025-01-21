import { Despesa } from '../../domain/despesa';

export interface DespesaRepository {
    save(despesa: Despesa): Promise<void>;
    findAll(): Promise<Array<Despesa>>;
    findByUserId(userId: string): Promise<Despesa[]>;
    findById(id: string): Promise<Despesa | null>;
    findById(id: string): Promise<Despesa | null>;
    update(id: string, updates: Partial<Despesa>): Promise<Despesa | null>;    
}


