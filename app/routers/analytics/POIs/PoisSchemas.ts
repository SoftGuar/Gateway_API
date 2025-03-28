export const poisSchemas = {
    TopVisitedPOIsSchema: {
        schema: {
            description: 'Get the top 10 most visited POIs',
            tags: ['Analytics: POIs'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            POI_id: { type: 'number' },
                            visit_count: { type: 'number' }
                        },
                        required: ['POI_id', 'visit_count']
                    }
                }
            }
        }
    }
};