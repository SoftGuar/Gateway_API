import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionService } from '../../services/sales/transactionService';


// Handler for creating a transaction
export async function createTransactionHandler(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
) {
    try {
        const transactionData = request.body;
        const transaction = await TransactionService.createTransaction(transactionData);
        return reply.code(201).send({
            success: true,
            data: transaction.transaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for retrieving all transactions
export async function getTransactionsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const transactions = await TransactionService.getTransactions();
        return reply.code(200).send({
            success: true,
            data: transactions,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for retrieving a transaction by ID
export async function getTransactionByIdHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const transaction = await TransactionService.getTransactionById(Number(id));
        if (!transaction) {
            return reply.code(404).send({
                success: false,
                message: 'Transaction not found',
            });
        }
        return reply.code(200).send({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error(`Error fetching transaction with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for updating a transaction
export async function updateTransactionHandler(
    request: FastifyRequest<{ Params: { id: string }; Body: any }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const transactionData = request.body;
        const updatedTransaction = await TransactionService.updateTransaction(Number(id), transactionData);
        return reply.code(200).send({
            success: true,
            data: updatedTransaction,
        });
    } catch (error) {
        console.error(`Error updating transaction with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for deleting a transaction
export async function deleteTransactionHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        await TransactionService.deleteTransaction(Number(id));
        return reply.code(200).send({
            success: true,
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        console.error(`Error deleting transaction with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for fetching sales
export async function fetchSalesHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const sales = await TransactionService.fetchSales();
        return reply.code(200).send({
            success: true,
            data: sales,
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

export async function confirmProductTransactionHandler(
    request: FastifyRequest<{ Params: {
        transaction_id: string;
        dispositive_id: string;
    } }>,
    reply: FastifyReply
) {
    try {
        const transaction_id = Number(request.params.transaction_id);
        const dispositive_id = Number(request.params.dispositive_id);
        const transaction = await TransactionService.confirmTransaction(transaction_id, dispositive_id);
        return reply.code(200).send({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error('Error confirming product transaction:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}