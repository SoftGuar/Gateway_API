import { FastifyInstance } from 'fastify';
import {
  getAllInterventionsHandler,
  getInterventionByIdHandler,
  getInterventionsByMaintainerIdHandler,
  createInterventionHandler,
  updateInterventionHandler,
  updateInterventionStatusHandler,
  updateInterventionReportHandler,
  deleteInterventionHandler
} from '../../../handlers/maintainer/InterventionHandler';
import { checkMaintainerRole } from '../../../middlewares/roleCheck';
import {
  getAllInterventionsSchema,
  getInterventionByIdSchema,
  getInterventionsByMaintainerIdSchema,
  createInterventionSchema,
  updateInterventionSchema,
  updateInterventionStatusSchema,
  updateInterventionReportSchema,
  deleteInterventionSchema
} from './intervention.schema';


// Router pour les Interventions
const maintainerInterventionRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for all maintainer routes in this plugin
  fastify.addHook('preHandler', checkMaintainerRole);

  // Get all interventions
  fastify.get('/', { schema: getAllInterventionsSchema }, getAllInterventionsHandler);

  // Get an intervention by ID
  fastify.get('/:id', { schema: getInterventionByIdSchema }, getInterventionByIdHandler);

  // Get interventions by Maintainer ID
  fastify.get('/maintainer/:maintainerId', { schema: getInterventionsByMaintainerIdSchema }, getInterventionsByMaintainerIdHandler);

  // Create a new intervention
  fastify.post('/', { schema: createInterventionSchema }, createInterventionHandler);

  // Update an intervention
  fastify.put('/:id', { schema: updateInterventionSchema }, updateInterventionHandler);

  // Update intervention status
  fastify.patch('/:id/status', { schema: updateInterventionStatusSchema }, updateInterventionStatusHandler);
 
    // Update an intervention report
    fastify.put('/:id/report', { schema: updateInterventionReportSchema }, updateInterventionReportHandler);

  // Delete an intervention
  fastify.delete('/:id', { schema: deleteInterventionSchema }, deleteInterventionHandler);
};


export default maintainerInterventionRouter ;
