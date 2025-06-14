
export const logsSchemas = {
    getLogs: {
        description: "Get the last 100 logs",
        tags: ["Analytics: Logs"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        full_log: { type: "object" },
                        created_at: { type: "string", format: "date-time" },
                    },
                },
            },
        },
    },
};