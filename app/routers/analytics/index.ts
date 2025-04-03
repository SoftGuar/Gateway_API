import { FastifyInstance } from 'fastify';
import { navigationRoutes } from './Navigation/NavigationRoutes';
import { DeviceRoutes } from './devices/DeviceRoutes';
import { PoisRoutes } from './POIs/PoisRoutes';
import { zonesRoutes } from './Zone/ZonesRoutes';
import { UserRoutes } from './Users/UserRoutes';
import { salesStatsRoutes } from './sales/saleStatsRoutes';
import { quotationsRoutes } from './quotations/quotationsRoutes';

export default async function registerAnalyticsRoutes(app: FastifyInstance) {
    app.register(DeviceRoutes);
    app.register(PoisRoutes);
    app.register(zonesRoutes);
    app.register(UserRoutes);
    app.register(navigationRoutes);
    app.register(salesStatsRoutes);
    app.register(quotationsRoutes);
}