import { FastifyInstance, FastifyRequest } from 'fastify';
import { appEmitter } from '../../services/notifications/event';

export async function environmentManagementRoutes(fastify: FastifyInstance) {
    fastify.post('/environment-created', async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
        appEmitter.emit('environment.created', {
            name: request.body.name
        });
        return { success: true, event: 'environment.created' };
    });

    fastify.post('/zone-created', async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
        appEmitter.emit('zone.created', {
            zoneName: request.body.name
        });
        return { success: true, event: 'zone.created' };
    });

    fastify.post('/zone-updated', async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
        appEmitter.emit('zone.updated', {
            zoneName: request.body.name
        });
        return { success: true, event: 'zone.updated' };
    });

    fastify.post('/zone-deleted', async (request: FastifyRequest<{ Body: { id: string } }>, reply) => {
        appEmitter.emit('zone.deleted', {
            zoneId: request.body.id,
        });
        return { success: true, event: 'zone.deleted' };
    });

    fastify.post('/floor-created', async (request: FastifyRequest<{ Body: { floorName: string, environmentId: string } }>, reply) => {
        appEmitter.emit('floor.created', {
            floorName: request.body.floorName,
            environmentId: request.body.environmentId,
        });
        return { success: true, event: 'floor.created' };
    });

    fastify.post('/floor-updated', async (request: FastifyRequest<{ Body: { id: string } }>, reply) => {
        appEmitter.emit('floor.updated', {
            floorId: request.body.id,
        });
        return { success: true, event: 'floor.updated' };
    });

    fastify.post('/floor-deleted', async (request: FastifyRequest<{ Body: { id: string } }>, reply) => {
        appEmitter.emit('floor.deleted', {
            floorId: request.body.id,
        });
        return { success: true, event: 'floor.deleted' };
    });

    fastify.post('/poi-created', async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
        appEmitter.emit('poi.created', {
            poiName: request.body.name
        });
        return { success: true, event: 'poi.created' };
    });

    fastify.post('/poi-updated', async (request: FastifyRequest<{ Body: { name: string } }>, reply) => {
        appEmitter.emit('poi.updated', {
            poiName: request.body.name
        });
        return { success: true, event: 'poi.updated' };
    });

    fastify.post('/poi-deleted', async (request: FastifyRequest<{ Body: { id: string } }>, reply) => {
        appEmitter.emit('poi.deleted', {
            poiId: request.body.id
        });
        return { success: true, event: 'poi.deleted' };
    });
}