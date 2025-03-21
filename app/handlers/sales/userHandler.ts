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

// Handler for retrieving a user by ID
export async function getUserByIdHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const user = await UsersService.getUserById(Number(id));
        if (!user) {
            return reply.code(404).send({
                success: false,
                message: 'User not found',
            });
        }
        return reply.code(200).send({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(`Error fetching user with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}

// Handler for retrieving all users
export async function getAllUsersHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const users = await UsersService.getAllUsers();
        return reply.code(200).send({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        return reply.code(500).send({
            success: false,
            message: 'Internal server error',
        });
    }
}