import { FastifyReply, FastifyRequest } from "fastify";
import { LogsService } from "../../services/analytics/logsService";

export async function getLogs(
    request: FastifyRequest,
    reply: FastifyReply
    ) {
    try {
        const logs = await LogsService.getLogs();
        reply.code(200).send(logs);
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch logs" });
    }
    }