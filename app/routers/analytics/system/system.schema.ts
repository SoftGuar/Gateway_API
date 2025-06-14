
export const getUptimeStatsSchema= {
    schema: {
    description: "Get system uptime statistics",
    tags: ["System"],
    response: {
        200: {
            type: "object",
            properties: {
                averageUptimeRaw: { type: "number", description: "System uptime average Raw" },
                maxUptimeRaw:  { type: "number", description: "System uptime max Raw" },
                averageUptime: { type: "string", description: "System uptime average formatted as 'Xh Ym'" },
                maxUptime:     { type: "string", description: "System uptime max formatted as 'Xh Ym'" }
            }
        }
    }}
};

export const getAnomaliesSchema={
schema:{
    description: "Get system anomalies",
    tags: ["System"],
    response: {
        200: {
            type: "array",
        }
    }}
};

export const getDiskUsageSchema = {
    schema: {
        description: "Get system disk usage",
        tags: ["System"],
        response: {
            200: {
                type: "array",
                properties: {
                    diskUsage: {
                        type: "array",
                        items: {
                            type: "object",
                        properties: {
                            timestamp: { type: "string", format: "date-time" },
                            disk_usage_percent: { type: "number", description: "Disk usage percentage" },
                            cpu_usage: { type: "number", description: "CPU usage percentage" }
                        }
                    }
                }
            }
        }
    }
}};