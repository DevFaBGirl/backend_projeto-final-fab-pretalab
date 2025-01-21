import { RepositoryData } from '../database/repository';
import { CreateDespesaUseCase } from '../../application/use-cases/create-despesa-use-case';
import { GetDespesasByUserUseCase } from '../../application/use-cases/get-despesas-by-user-use-case';
import { UpdateDespesaUseCase } from '../../application/use-cases/update-despesa-use-case'; // Import do use case de atualização
import { DespesaController } from '../../interface/despesa-controller';
import { RepositoryAI } from '../genai/repository';
import { ChatController } from '../../interface/chat-controller';
import { CreateChatUseCase } from '../../application/use-cases/create-chat-use-case';

export function configureDependencies() {
    const despesaRepository = new RepositoryData();

    // use cases despesas
    const createDespesaUseCase = new CreateDespesaUseCase(despesaRepository);
    const listAllDespesasUseCase = new GetDespesasByUserUseCase(despesaRepository);
    const updateDespesaUseCase = new UpdateDespesaUseCase(despesaRepository); // Instância use case de atualização

    // use cases chat
    const chatRepository = new RepositoryAI();
    const createChatUseCase = new CreateChatUseCase(chatRepository, despesaRepository);

    // Controllers
    const despesaController = new DespesaController(
        createDespesaUseCase, 
        listAllDespesasUseCase, 
        updateDespesaUseCase 
    );
    const chatController = new ChatController(createChatUseCase);

    return {
        despesaController,
        chatController,
    };
}
