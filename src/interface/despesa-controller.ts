import { DeleteDespesaUseCase } from './../application/use-cases/delete-despesas-use-case';
import { Request, Response } from 'express';
import { CreateDespesaUseCase } from '../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../application/use-cases/get-despesas-by-user-use-case';
import { UpdateDespesaUseCase } from '../application/use-cases/update-despesa-use-case';
import { Despesa } from '../domain/despesa';

export class DespesaController {
    constructor(
    private createDespesaUseCase: CreateDespesaUseCase,
    private getDespesasByUserUseCase: GetDespesasByUserUseCase,
    private updateDespesaUseCase: UpdateDespesaUseCase, // use case update
    private deleteDespesaUseCase: DeleteDespesaUseCase // use case delete
  ) {}

  create(req: Request, res: Response) {
    try {   //adicionei o trycat para tratar erros e ter boas práticas
      const params: Despesa = req.body;
      const despesa = this.createDespesaUseCase.execute(params);
      res.status(201).json(despesa);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado';
      res.status(400).json({ message: errorMessage });
    }
  }
  async getById(req: Request, res: Response) {
    const userId = req.params.userId;
    const despesas = await this.getDespesasByUserUseCase.execute(userId);
    res.json(despesas);
  }


  async getAll(req: Request, res: Response) {
    const despesas = await this.getDespesasByUserUseCase.find();
    res.json(despesas);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedDespesa = await this.updateDespesaUseCase.execute(id, updates);
      res.status(200).json(updatedDespesa);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'erro inesperado aconteceu';
      res.status(400).json({ message: errorMessage });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.deleteDespesaUseCase.delete(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'erro inesperado aconteceu';
      res.status(400).json({ message: errorMessage });
    }
  }
}
