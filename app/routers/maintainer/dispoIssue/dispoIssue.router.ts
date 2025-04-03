import { FastifyInstance } from 'fastify';
import {
  getDispoIssuessHandler,
  getDispoIssueByIdHandler,
  getDispoIssuesByDispositiveIdHandler
} from '../../../handlers/maintainer/dispoIssueHandler';
import { checkMaintainerRole } from '../../../middlewares/roleCheck';
import {
  getDispoIssuesSchema,
  getDispoIssueByIdSchema,
  getDispoIssuesByDispositiveIdSchema,
} from './dispoIssue.schema';

// Router pour les DispoIssues
const maintainerDispoIssueRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for all maintainer routes in this plugin
  fastify.addHook('preHandler', checkMaintainerRole);

  // Get all dispoIssues
  fastify.get('/', { schema: getDispoIssuesSchema }, getDispoIssuessHandler);

  // Get a dispoIssue by ID
  fastify.get('/:id', { schema: getDispoIssueByIdSchema }, getDispoIssueByIdHandler);

  // Get dispoIssues by Dispositive ID
  fastify.get('/dispositive/:dispositiveId', { schema: getDispoIssuesByDispositiveIdSchema }, getDispoIssuesByDispositiveIdHandler);

};

export default maintainerDispoIssueRouter ;