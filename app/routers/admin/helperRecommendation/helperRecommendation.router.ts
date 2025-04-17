import { FastifyInstance } from 'fastify';
import { checkAdminOrMaintainerRole } from '../../../middlewares/roleCheck';

import {
  getHelperRecommendations,
  getHelperRecommendationById,
  approveHelperRecommendation,
  rejectHelperRecommendation,
  deleteHelperRecommendation
} from '../../../handlers/admin/helperRecommendationHandler';
import {
  getHelperRecommendationsSchema,
  getHelperRecommendationByIdSchema,
  approveHelperRecommendationSchema,
  rejectHelperRecommendationSchema,
  deleteHelperRecommendationSchema
} from './helperRecommendation.schema';

const AdminhelperRecommendationRouter = async (fastify: FastifyInstance) => {
    // Register preHandler hook for admin authorization
    fastify.addHook('preHandler', checkAdminOrMaintainerRole);
  
  fastify.get('/', { schema: getHelperRecommendationsSchema }, getHelperRecommendations);
  fastify.get('/:id', { schema: getHelperRecommendationByIdSchema }, getHelperRecommendationById);
  fastify.post('/:id/approve', { schema: approveHelperRecommendationSchema }, approveHelperRecommendation);
  fastify.post('/:id/reject', { schema: rejectHelperRecommendationSchema }, rejectHelperRecommendation);
  fastify.delete('/:id', { schema: deleteHelperRecommendationSchema }, deleteHelperRecommendation);
};



export default AdminhelperRecommendationRouter;