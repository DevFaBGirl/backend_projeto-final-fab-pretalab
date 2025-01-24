import { DespesaRepository } from '../../application/repositores/depesa-repository';
import { Despesa } from '../../domain/despesa';
import { DespesaModel } from './model';

export class RepositoryData implements DespesaRepository {
  async save(despesa: Despesa): Promise<void> {
    const despesaModel = new DespesaModel(despesa);
    await despesaModel.save();
  }

  async findAll(): Promise<Despesa[]> {
    const despesas = await DespesaModel.find();
    const translatedDespesas = despesas.map(item => ({
      id: item._id.toString(),
      descricao: item.descricao,
      categoria: item.categoria,
      valor: item.valor,
      tipo: item.tipo,
      data: item.data,
      userId: item.userId,
    }));

    return translatedDespesas as Despesa[];
  }

  async update(id: string, updates: Partial<Despesa>): Promise<Despesa | null> {
    const updatedDespesa = await DespesaModel.findByIdAndUpdate(id, updates, {
      new: true, // Retorna o documento atualizado
      runValidators: true, // Executa validações do modelo no update
    });

    if (!updatedDespesa) {
      return null; // Retorna null se a despesa não for encontrada
    }

    // Transforma o modelo atualizado para o formato de domínio
    return {
      id: updatedDespesa._id.toString(),
      descricao: updatedDespesa.descricao,
      categoria: updatedDespesa.categoria,
      valor: updatedDespesa.valor,
      tipo: updatedDespesa.tipo,
      data: updatedDespesa.data,
      userId: updatedDespesa.userId,
    } as Despesa;
  }

  // Novo método: findByUserId
  async findByUserId(userId: string): Promise<Despesa[]> {
    const despesas = await DespesaModel.find({ userId });
    return despesas.map(item => ({
      id: item._id.toString(),
      descricao: item.descricao,
      categoria: item.categoria,
      valor: item.valor,
      tipo: item.tipo,
      data: item.data,
      userId: item.userId,
    })) as Despesa[];
  }

  // Novo método: findById
  async findById(id: string): Promise<Despesa | null> {
    const despesa = await DespesaModel.findById(id);

    if (!despesa) {
      return null;
    }

    return {
      id: despesa._id.toString(),
      descricao: despesa.descricao,
      categoria: despesa.categoria,
      valor: despesa.valor,
      tipo: despesa.tipo,
      data: despesa.data,
      userId: despesa.userId,
    } as Despesa;
  }

  // Novo método: delete
  async delete(id: string): Promise<void> {
    await DespesaModel.findByIdAndDelete(id);
  }
}
