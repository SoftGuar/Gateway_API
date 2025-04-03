import { Config } from '../services.config';
import { MonitoringService } from '../services/monitoringService/monitoring.service';
import {
  DispoIssueType,
  InterventionType,
  InterventionStatus,
  ReportType
} from '../services/monitoringService/types';

describe('MonitoringService', () => {
  let service: MonitoringService;
  let dispoIssueId: string;
  let interventionId: string;
  let reportId: string;
  
  // Set unique identifiers for test entities
  const timestamp = Date.now();
  const testDescription = `Test Description `;
  const testReportTitle = `Test Report `;

  beforeAll(() => {
    service = new MonitoringService();
  });

  // Clean up any test data that wasn't properly removed
  afterAll(async () => {
    try {
      if (interventionId) await service.deleteIntervention(interventionId);
      if (dispoIssueId) await service.deleteDispoIssue(dispoIssueId);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('DispoIssue Management', () => {
    test('should create a new dispositif issue', async () => {
      const newDispoIssueData = {
        maintainerId: 52,
        dispositiveId: 1,
        description: testDescription,
        status: 'pending',
        date: new Date().toISOString()
      };

      const dispoIssue = await service.createDispoIssue(newDispoIssueData);
      dispoIssueId = dispoIssue.id.toString();

      console.log('DispoIssue:', dispoIssue);

      expect(dispoIssue).toBeDefined();
      expect(dispoIssue.id).toBeDefined();
      expect(dispoIssue.description).toBe(newDispoIssueData.description);
      expect(dispoIssue.status).toBe(newDispoIssueData.status);
      expect(dispoIssue.maintainerId).toBe(newDispoIssueData.maintainerId);
      expect(dispoIssue.dispositiveId).toBe(newDispoIssueData.dispositiveId);
    });

    test('should get all dispo issues', async () => {
      const dispoIssues = await service.getAllDispoIssues();

      console.log('Dispo Issues:', dispoIssues);
      
      expect(dispoIssues).toBeDefined();
      expect(Array.isArray(dispoIssues)).toBe(true);
      expect(dispoIssues.some(issue => issue.id.toString() === dispoIssueId)).toBe(true);
    });

    test('should get dispo issue by id', async () => {
      const dispoIssue = await service.getDispoIssueById(dispoIssueId);

      console.log('DispoIssue:', dispoIssue);
      
      expect(dispoIssue).toBeDefined();
      expect(dispoIssue.id.toString()).toBe(dispoIssueId);
      expect(dispoIssue.description).toBe(testDescription);
    });

    test('should get dispo issues by dispositive id', async () => {
      const dispoIssues = await service.getDispoIssuesByDispositiveId('1');

      console.log('Dispo Issues by Dispositive:', dispoIssues);
      
      expect(dispoIssues).toBeDefined();
      expect(Array.isArray(dispoIssues)).toBe(true);
      expect(dispoIssues.some(issue => issue.id.toString() === dispoIssueId)).toBe(true);
    });

    test('should assign maintainer to dispo issue', async () => {
      const updatedDispoIssue = await service.assignMaintainerToDispoIssue(dispoIssueId, 52);

      console.log('Updated DispoIssue:', updatedDispoIssue);
      
      expect(updatedDispoIssue).toBeDefined();
      expect(updatedDispoIssue.id.toString()).toBe(dispoIssueId);
      expect(updatedDispoIssue.maintainerId).toBe(52);
    });

    test('should update dispo issue', async () => {
      const updatedData = {
        status: 'in-progress',
        description: `${testDescription} - Updated`
      };
      
      const updatedDispoIssue = await service.updateDispoIssue(dispoIssueId, updatedData);

      console.log('Updated DispoIssue:', updatedDispoIssue);
      
      expect(updatedDispoIssue).toBeDefined();
      expect(updatedDispoIssue.id.toString()).toBe(dispoIssueId);
      expect(updatedDispoIssue.status).toBe(updatedData.status);
      expect(updatedDispoIssue.description).toBe(updatedData.description);
    });
  });

  describe('Intervention Management', () => {
    test('should create a new intervention', async () => {
      const newInterventionData = {
        idMaintainer: 52,
        idDispositive: 1,
        description: testDescription,
        type: 'curative',
        status: InterventionStatus.pending,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      };
      
      const intervention = await service.createIntervention(newInterventionData);
      interventionId = intervention.id.toString();
      if (intervention.report) {
        reportId = intervention.report.id.toString();
      }

      console.log('Intervention:', intervention);
      
      expect(intervention).toBeDefined();
      expect(intervention.id).toBeDefined();
      expect(intervention.description).toBe(newInterventionData.description);
      expect(intervention.status).toBe(newInterventionData.status);
      expect(intervention.type).toBe(newInterventionData.type);
    });
    
    test('should get all interventions', async () => {
      const interventions = await service.getAllInterventions();

      console.log('Interventions:', interventions);
      
      expect(interventions).toBeDefined();
      expect(Array.isArray(interventions)).toBe(true);
      expect(interventions.some(item => item.id.toString() === interventionId)).toBe(true);
    });
    
    test('should get intervention by id', async () => {
      const intervention = await service.getInterventionById(interventionId);

      console.log('Intervention:', intervention);
      
      expect(intervention).toBeDefined();
      expect(intervention.id.toString()).toBe(interventionId);
      expect(intervention.description).toBe(testDescription);
    });
    
    test('should get interventions by maintainer id', async () => {
      const interventions = await service.getInterventionsByMaintainerId('52');

      console.log('Interventions by Maintainer:', interventions);
      
      expect(interventions).toBeDefined();
      expect(Array.isArray(interventions)).toBe(true);
      expect(interventions.some(item => item.id.toString() === interventionId)).toBe(true);
    });
    
    test('should update intervention', async () => {
      const updatedData = {
        description: `${testDescription} - Updated`,
        type: 'repair'
      };
      
      const updatedIntervention = await service.updateIntervention(interventionId, updatedData);

      console.log('Updated Intervention:', updatedIntervention);
      
      expect(updatedIntervention).toBeDefined();
      expect(updatedIntervention.id.toString()).toBe(interventionId);
      expect(updatedIntervention.description).toBe(updatedData.description);
      expect(updatedIntervention.type).toBe(updatedData.type);
    });

    test('should update intervention status', async () => {
      const updatedIntervention = await service.updateInterventionStatus(interventionId, InterventionStatus.inProgress);

      console.log('Intervention with Updated Status:', updatedIntervention);
      
      expect(updatedIntervention).toBeDefined();
      expect(updatedIntervention.id.toString()).toBe(interventionId);
      expect(updatedIntervention.status).toBe(InterventionStatus.inProgress);
    });

    test('should update intervention report', async () => {
      const reportData = {
        title: `${testReportTitle} - Updated`,
        description: 'Updated report description'
      };
      
      const updatedReport = await service.updateInterventionReport(interventionId, reportData);

      console.log('Updated Report:', updatedReport);
      
      expect(updatedReport).toBeDefined();
      expect(updatedReport.interventionId.toString()).toBe(interventionId);
      expect(updatedReport.title).toBe(reportData.title);
      expect(updatedReport.description).toBe(reportData.description);
    });
  });

  describe('Delete operations', () => {
    test('should delete intervention', async () => {
      const response = await service.deleteIntervention(interventionId);

      console.log('Delete Intervention:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('intervention deleted successfully');
      
      // Verify intervention is deleted
      try {
        await service.getInterventionById(interventionId);
        fail('Intervention should not exist');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    
    test('should delete dispo issue', async () => {
      const response = await service.deleteDispoIssue(dispoIssueId);

      console.log('Delete DispoIssue:', response);
      
      expect(response).toBeDefined();
      expect(response.message).toBe('DispoIssue deleted successfully');
      
      // Verify dispo issue is deleted
      try {
        await service.getDispoIssueById(dispoIssueId);
        fail('DispoIssue should not exist');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});