import { FastifyRequest, FastifyReply } from "fastify";
import { SystemService } from "../../services/analytics/systemService";
const systemService = new SystemService();
export class SystemHandler {
    public async handleGetUptimeStats(req: FastifyRequest, reply: FastifyReply) {
        try {
            const stats = await systemService.getUptimeStats();
            reply.send(stats);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    }

    public async handleGetAnomalies(req: FastifyRequest, reply: FastifyReply) {
        try {
            const anomalies = await systemService.getAnomalies();
            reply.send(anomalies);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    }

    public async handleGetDiskUsage(req: FastifyRequest, reply: FastifyReply) {
        try {
            const diskUsage = await systemService.getDiskUsage();
            reply.send(diskUsage);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    }
}