
import maintainerDispositiveRouter from'./dispositive/dispositive.router';
import maintainerDispoIssueRouter from'./dispoIssue/dispoIssue.router';
import maintainerInterventionRouter from'./intervention/intervention.router';

import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const maintainerRoutes = (fastify: FastifyInstance) => {

    // Register maintainer dispositive routes with a prefix
    fastify.register(maintainerDispositiveRouter, { prefix: '/dispositive' });

    // Register maintainer dispoIssue routes with a prefix
    fastify.register(maintainerDispoIssueRouter, { prefix: '/dispoIssue' });

     // Register maintainer intervention routes with a prefix
    fastify.register(maintainerInterventionRouter, { prefix: '/intervention' });

  
};

export default maintainerRoutes;


