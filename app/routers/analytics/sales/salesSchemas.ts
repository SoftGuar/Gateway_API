export const salesSchemas = {
    CRRSchema: {
        schema: {
            description: 'Get the Customer Retention Rate (CRR)',
            tags: ['Analytics: Sales'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        crr: { type: 'number', description: 'Customer Retention Rate as a percentage' }
                    },
                }
            }
        }
    },
    CustomerRetentionDetailsSchema: {
        schema: {
            description: 'Get detailed customer retention information',
            tags: ['Analytics: Sales'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        new_customers: { type: 'number', description: 'Number of new customers' },
                        existing_customers: { type: 'number', description: 'Number of existing customers' },
                        total_customers: { type: 'number', description: 'Total number of customers' },
                        retention_rate: { type: 'number', description: 'Customer Retention Rate as a percentage' }
                    },
                    required: ['new_customers', 'existing_customers', 'total_customers', 'retention_rate']
                }
            }
        }
    }
};