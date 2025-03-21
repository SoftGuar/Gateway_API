import { FastifyInstance } from 'fastify';
import * as qh from '../../handlers/sales/quotationHandler';

async function quotationRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['Sales'],
      summary: 'Create a new quotation',
      description: 'Creates a new quotation',
      body: {
        type: 'object',
        properties: {
          user_id: { type: 'number' },
          date: { type: 'string', format: 'date-time' }
        },
        required: ['user_id', 'date']
      },
      response: {
        201: {
          description: 'Quotation created successfully',
          type: 'object',
          properties: {
            id: { type: 'string' },
            user_id: { type: 'number' },
            date: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  }, qh.createQuotationHandler);

  fastify.get('/', {
    schema: {
      tags: ['Sales'],
      summary: 'Retrieve all quotations',
      description: 'Retrieves all quotations',
      response: {
        200: {
          description: 'A list of quotations',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              user_id: { type: 'number' },
              date: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  }, qh.getAllQuotationsHandler);

  fastify.put('/:id', {
    schema: {
      tags: ['Sales'],
      summary: 'Update a quotation by ID',
      description: 'Updates an existing quotation by its ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          date: { type: 'string', format: 'date-time' },
          user_id: { type: 'number' }
        }
      },
      response: {
        200: {
          description: 'Quotation updated successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            date: { type: 'string' }
          }
        }
      }
    }
  }, qh.updateQuotationHandler);

  fastify.get('/:id', {
    schema: {
      tags: ['Sales'],
      summary: 'Retrieve a quotation by ID',
      description: 'Retrieves a specific quotation by its ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            date: { type: 'string' }
          }
        }
      }
    }
  }, qh.getQuotationByIdHandler);

  fastify.delete('/:id', {
    schema: {
      tags: ['Sales'],
      summary: 'Delete a quotation by ID',
      description: 'Deletes a specific quotation by its ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Quotation deleted successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            date: { type: 'string' }
          }
        }
      }
    }
  }, qh.deleteQuotationHandler);

  fastify.post('/associate/:id', {
    schema: {
      tags: ['Sales'],
      summary: 'Associate a product with a quotation',
      description: 'Associates a product with a quotation by its ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          product_id: { type: 'number' },
          count: { type: 'number' }
        },
        required: ['product_id', 'count']
      },
      response: {
        200: {
          description: 'Product associated successfully',
          type: 'object',
          properties: {
            quotation_id: { type: 'number' },
            product_id: { type: 'number' },
            count: { type: 'number' }
          }
        }
      }
    }
  }, qh.associateProductHandler);

  fastify.get('/user/:user_id', {
    schema: {
      tags: ['Sales'],
      summary: 'Retrieve quotations by user ID',
      description: 'Retrieves all quotations associated with a specific user ID',
      params: {
        type: 'object',
        properties: {
          user_id: { type: 'number' }
        },
        required: ['user_id']
      },
      response: {
        200: {
          description: 'A list of quotations associated with the user',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              user_id: { type: 'number' },
              date: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  }, qh.findQuotationsByUserIdHandler);

  fastify.post('/demande', {
    schema: {
      tags: ['Sales'],
      summary: 'Create a new quotation demand',
      description: 'Creates a new quotation demand',
      body: {
        type: 'object',
        properties: {
          user_id: { type: 'integer' },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product_id: { type: 'integer' },
                count: { type: 'integer' }
              },
              required: ['product_id', 'count']
            }
          }
        },
        required: ['user_id', 'products']
      },
      response: {
        201: {
          description: 'Quotation demand created successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
            quotation: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                date: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, qh.demandeQuotationHandler);
}

export default quotationRoutes;
