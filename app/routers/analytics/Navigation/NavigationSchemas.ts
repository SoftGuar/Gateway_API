export const navigationSchemas = {
    NavigationLogsSchema: {
        schema: {
            description: 'Get all navigation logs',
            tags: ['Analytics: Navigation'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            environment_id: { type: 'number' },
                            start_time: { type: 'string', format: 'date-time' },
                            end_time: { type: 'string', format: 'date-time', nullable: true },
                            rerouting_count: { type: 'number' }
                        },
                        required: ['id', 'environment_id', 'start_time', 'rerouting_count']
                    }
                }
            }
        }
    },
    MostReroutingRequestsSchema: {
        schema: {
            description: 'Get the top 5 environments with the most rerouting requests',
            tags: ['Analytics: Navigation'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            environment_id: { type: 'number' },
                            rerouting_count: { type: 'number' }
                        },
                        required: ['environment_id', 'rerouting_count']
                    }
                }
            }
        }
    },
    SuccessfulNavigationsSchema: {
        schema: {
            description: 'Get the daily success rate of navigations',
            tags: ['Analytics: Navigation'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            date: { type: 'string', format: 'date' },
                            total_attempts: { type: 'number' },
                            successful_navigations: { type: 'number' },
                            success_rate: { type: 'number' }
                        },
                        required: ['date', 'total_attempts', 'successful_navigations', 'success_rate']
                    }
                }
            }
        }
    }
};