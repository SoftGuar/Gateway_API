import { FastifyInstance } from 'fastify';
import {
    getInterventionAverageDuration,
    getMonthlyAverageDuration,
    getMaintainerInterventionCount,
    getAverageAnswerTime
} from '../../../handlers/analytics/interventionHandler';
import { interventionSchemas } from './interventionSchemas';
export async function interventionRoutes(fastify: FastifyInstance) {
    fastify.get('/interventions/average-duration', {
        schema: interventionSchemas.InterventionAverageDurationSchema.schema
    }, getInterventionAverageDuration);

    fastify.get('/interventions/monthly-average-duration', {
        schema: interventionSchemas.MonthlyAverageDurationSchema.schema
    }, getMonthlyAverageDuration);

    fastify.get('/interventions/maintainer-count', {
        schema: interventionSchemas.MaintainerInterventionCountSchema.schema
    }, getMaintainerInterventionCount);

    fastify.get('/interventions/average-answer-time', {
        schema: interventionSchemas.AverageAnswerTimeSchema.schema
    }, getAverageAnswerTime);
}