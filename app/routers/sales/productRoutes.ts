import { FastifyInstance } from 'fastify';
import * as pm from '../../handlers/sales/productHandler';

async function productRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        description: 'Get all products',
        tags: ['Sales'],
        summary: 'Fetch all products',
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    },
    pm.getAllProductsHandler
  );
  fastify.get(
    '/:id',
    {
      schema: {
        description: 'Get a product by ID',
        tags: ['Sales'],
        summary: 'Fetch a product by its ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'The ID of the product' },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    pm.getProductByIdHandler
  );
}

export default productRoutes;
