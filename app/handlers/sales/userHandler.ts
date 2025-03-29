import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersService } from '../../services/sales/usersService';


// Handler for creating a user and a helper
export async function createUserAndHelperHandler(
    request: FastifyRequest<{ Body: { user: any; helper: any } }>,
    reply: FastifyReply
) {
    try {
        const { user, helper } = request.body;
        const result = await UsersService.createUserandHelper(user, helper);
        if (!result) {
            return reply.code(400).send({
                success: false,
                message: 'Failed to create user and helper',
            });
        }
        return reply.code(201).send({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Error creating user and helper:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}