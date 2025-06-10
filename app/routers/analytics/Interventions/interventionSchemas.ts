export const interventionSchemas = {
    InterventionAverageDurationSchema: {
        schema: {
            description: 'Get the average duration of interventions',
            tags: ['Interventions'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        avg_repair_time: { type: 'number' }
                    },
                    required: ['avg_repair_time']
                }
            }
        }
    },
    MonthlyAverageDurationSchema: {
        schema: {
            description: 'Get the monthly average duration of interventions',
            tags: ['Interventions'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            year: { type: 'number' },
                            month: { type: 'number' },
                            average_duration: { type: 'number' }
                        },
                        required: ['year', 'month', 'average_duration']
                    }
                }
            }
        }
    },
    MaintainerInterventionCountSchema: {
        schema: {
            description: 'Get the count of interventions per maintainer',
            tags: ['Interventions'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            maintainer_id: { type: 'number' },
                            first_name: { type: 'string' },
                            last_name: { type: 'string' },
                            intervention_count: { type: 'number' }
                        },
                        required: ['maintainer_id', 'first_name', 'last_name', 'intervention_count']
                    }
                }
            }
        }
    },
    AverageAnswerTimeSchema: {
        schema: {
            description: 'Get the average response time for maintainers',
            tags: ['Interventions'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            issue_id: { type: 'number' },
                            maintainer_id: { type: 'number' },
                            first_name: { type: 'string' },
                            last_name: { type: 'string' },
                            avg_response_time_minutes: { type: 'number' }
                        },
                        required: ['issue_id', 'maintainer_id', 'first_name', 'last_name', 'avg_response_time_minutes']
                    }
                }
            }
        }
    }
};