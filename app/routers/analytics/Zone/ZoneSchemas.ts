export const zoneSchemas = {
    TopVisitedZonesSchema: {
        schema: {
            description: 'Get the top 10 most visited zones',
            tags: ['Analytics: Zones'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            zone_id: { type: 'number' },
                            visit_count: { type: 'number' }
                        },
                        required: ['zone_id', 'visit_count']
                    }
                }
            }
        }
    },
    AverageTimeSpentInZonesSchema: {
        schema: {
            description: 'Get the average time spent in each zone',
            tags: ['Analytics: Zones'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            zone_id: { type: 'number' },
                            avg_time_seconds: { type: 'number' }
                        },
                        required: ['zone_id', 'avg_time_seconds']
                    }
                }
            }
        }
    },
    ZonesWithHighestObstacleCountSchema: {
        schema: {
            description: 'Get the top 5 zones with the highest obstacle counts',
            tags: ['Analytics: Zones'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            zone_id: { type: 'number' },
                            total_obstacles: { type: 'number' }
                        },
                        required: ['zone_id', 'total_obstacles']
                    }
                }
            }
        }
    }
};