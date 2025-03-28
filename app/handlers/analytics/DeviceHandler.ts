import { FastifyRequest, FastifyReply } from "fastify";
import { DeviceService } from "../../services/analytics/DeviceService";
export class DeviceHandler {
  static async getDeviceStatus(req: FastifyRequest, reply: FastifyReply) {
    try {
      const deviceStatus = await DeviceService.getDeviceStatus();
      reply.status(200).send(deviceStatus);
    } catch (error) {
      console.error("Error in DeviceHandler.getDeviceStatus:", error);
      reply.status(500).send({ error: "Failed to fetch device status" });
    }
  }
  static async getDeviceIssuesOverTime(
    req: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const deviceIssues = await DeviceService.getDeviceIssuesOverTime();
      reply.status(200).send(deviceIssues);
    } catch (error) {
      console.error("Error in DeviceHandler.getDeviceIssuesOverTime:", error);
      reply
        .status(500)
        .send({ error: "Failed to fetch device issues over time" });
    }
  }
  static async getDeviceIssues(req: FastifyRequest, reply: FastifyReply) {
    try {
      const deviceIssues = await DeviceService.getDeviceIssues();
      reply.status(200).send(deviceIssues);
    } catch (error) {
      console.error("Error in DeviceHandler.getDeviceIssues:", error);
      reply.status(500).send({ error: "Failed to fetch device issues" });
    }
  }
  static async getDevicePerformance(req: FastifyRequest, reply: FastifyReply) {
    try {
      const devicePerformance = await DeviceService.getDevicePerformance();
      reply.status(200).send(devicePerformance);
    } catch (error) {
      console.error("Error in DeviceHandler.getDevicePerformance:", error);
      reply.status(500).send({ error: "Failed to fetch device performance" });
    }
  }
  static async devicesSold(req: FastifyRequest, reply: FastifyReply) {
    try {
      const devicesSold = await DeviceService.devicesSold();
      reply.status(200).send(devicesSold);
    } catch (error) {
      console.error("Error in DeviceHandler.devicesSold:", error);
      reply.status(500).send({ error: "Failed to fetch devices sold" });
    }
  }

  static async deviceRevenue(req: FastifyRequest, reply: FastifyReply) {
    try {
      const deviceRevenue = await DeviceService.deviceRevenue();
      reply.status(200).send(deviceRevenue);
    } catch (error) {
      console.error("Error in DeviceHandler.deviceRevenue:", error);
      reply.status(500).send({ error: "Failed to fetch device revenue" });
    }
  }

  static async getMostPopularDevices(req: FastifyRequest, reply: FastifyReply) {
    try {
      const mostPopularDevices = await DeviceService.getMostPopularDevices();
      reply.status(200).send(mostPopularDevices);
    } catch (error) {
      console.error("Error in DeviceHandler.getMostPopularDevices:", error);
      reply.status(500).send({ error: "Failed to fetch most popular devices" });
    }
  }
  static async getDeviceIntervention(req: FastifyRequest, reply: FastifyReply) {
    try {
      const deviceIntervention = await DeviceService.getDeviceIntervention();
      reply.status(200).send(deviceIntervention);
    } catch (error) {
      console.error("Error in DeviceHandler.getDeviceIntervention:", error);
      reply.status(500).send({ error: "Failed to fetch device intervention" });
    }
  }
}
