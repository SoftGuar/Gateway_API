import { FastifyRequest, FastifyReply } from 'fastify';
import { QuotationService } from '../../services/sales/quotationService';

// Handler for creating a new quotation
export async function createQuotationHandler(
    request: FastifyRequest<{ Body: any }>,
    reply: FastifyReply
) {
    try {
        const quotation = await QuotationService.createQuotation(request.body);
        return reply.code(201).send({
            success: true,
            data: quotation,
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to create quotation',
        });
    }
}

// Handler for retrieving a quotation by ID
export async function getQuotationByIdHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const quotation = await QuotationService.getQuotationById(Number(id));
        if (!quotation) {
            return reply.code(404).send({
                success: false,
                message: 'Quotation not found',
            });
        }
        return reply.code(200).send({
            success: true,
            data: quotation,
        });
    } catch (error) {
        console.error(`Error fetching quotation with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch quotation',
        });
    }
}

// Handler for retrieving all quotations
export async function getAllQuotationsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const quotations = await QuotationService.getAllQuotations();
        return reply.code(200).send({
            success: true,
            data: quotations,
        });
    } catch (error) {
        console.error('Error fetching all quotations:', error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch quotations',
        });
    }
}

// Handler for updating a quotation
export async function updateQuotationHandler(
    request: FastifyRequest<{ Params: { id: string }; Body: any }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const updatedQuotation = await QuotationService.updateQuotation(Number(id), request.body);
        return reply.code(200).send({
            success: true,
            data: updatedQuotation,
        });
    } catch (error) {
        console.error(`Error updating quotation with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to update quotation',
        });
    }
}

// Handler for deleting a quotation
export async function deleteQuotationHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        await QuotationService.deleteQuotation(Number(id));
        return reply.code(200).send({
            success: true,
            message: 'Quotation deleted successfully',
        });
    } catch (error) {
        console.error(`Error deleting quotation with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to delete quotation',
        });
    }
}

// Handler for associating a product with a quotation
export async function associateProductHandler(
    request: FastifyRequest<{ Params: { id: string }; Body: { productId: number; count: number } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const { productId, count } = request.body;
        const result = await QuotationService.associateProduct(Number(id), productId, count);
        return reply.code(200).send({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(`Error associating product with quotation ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to associate product with quotation',
        });
    }
}

// Handler for retrieving quotations by user ID
export async function findQuotationsByUserIdHandler(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply
) {
    try {
        const { userId } = request.params;
        const quotations = await QuotationService.findByUserId(Number(userId));
        return reply.code(200).send({
            success: true,
            data: quotations,
        });
    } catch (error) {
        console.error(`Error fetching quotations for user ID ${request.params.userId}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch quotations for user',
        });
    }
}

// Handler for creating a quotation request with associated products
export async function demandeQuotationHandler(
    request: FastifyRequest<{ Body: { user_id: number; products: { productId: number; count: number }[] } }>,
    reply: FastifyReply
) {
    try {
        const { user_id, products } = request.body;
        const result = await QuotationService.demandeQuotation(user_id, products);
        return reply.code(201).send({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Error creating quotation request:', error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to create quotation request',
        });
    }
}