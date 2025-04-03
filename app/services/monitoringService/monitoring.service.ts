import { Config } from '../../services.config';
import { 
  DispoIssueService, 
  CreateDispoIssueData, 
  UpdateDispoIssueData 
} from './dispoIssue.service';
import { 
  InterventionService, 
  CreateInterventionData, 
  UpdateInterventionData, 
  UpdateReportData
} from './intervention.service';
import { 
  DispoIssueType, 
  InterventionType, 
  InterventionStatus, 
  ReportType
} from './types';

export class MonitoringService {
  private dispoIssueService: DispoIssueService;
  private interventionService: InterventionService;

  constructor() {
    this.dispoIssueService = new DispoIssueService();
    this.interventionService = new InterventionService();
  }

  // DispoIssue methods
  async createDispoIssue(dispoIssueData: CreateDispoIssueData): Promise<DispoIssueType> {
    return this.dispoIssueService.createDispoIssue(dispoIssueData);
  }

  async getAllDispoIssues(): Promise<DispoIssueType[]> {
    return this.dispoIssueService.getDispoIssues();
  }

  async getDispoIssueById(id: string): Promise<DispoIssueType> {
    return this.dispoIssueService.getDispoIssueById(id);
  }

  async getDispoIssuesByDispositiveId(dispositiveId: string): Promise<DispoIssueType[]> {
    return this.dispoIssueService.getDispoIssuesByDispositiveId(dispositiveId);
  }

  async assignMaintainerToDispoIssue(id: string, maintainerId: number): Promise<DispoIssueType> {
    return this.dispoIssueService.assignMaintainer(id, maintainerId);
  }

  async updateDispoIssue(id: string, updateData: UpdateDispoIssueData): Promise<DispoIssueType> {
    return this.dispoIssueService.updateDispoIssue(id, updateData);
  }

  async deleteDispoIssue(id: string): Promise<{ message: string }> {
    return this.dispoIssueService.deleteDispoIssue(id);
  }

  // Intervention methods
  async createIntervention(interventionData: CreateInterventionData): Promise<InterventionType> {
    return this.interventionService.createIntervention(interventionData);
  }

  async getAllInterventions(): Promise<InterventionType[]> {
    return this.interventionService.getInterventions();
  }

  async getInterventionById(id: string): Promise<InterventionType> {
    return this.interventionService.getInterventionById(id);
  }

  async getInterventionsByMaintainerId(maintainerId: string): Promise<InterventionType[]> {
    return this.interventionService.getInterventionsByMaintainerId(maintainerId);
  }

  async updateIntervention(id: string, updateData: UpdateInterventionData): Promise<InterventionType> {
    return this.interventionService.updateIntervention(id, updateData);
  }

  async updateInterventionStatus(id: string, status: InterventionStatus): Promise<InterventionType> {
    return this.interventionService.updateInterventionStatus(id, status);
  }

  async updateInterventionReport(id: string, reportData: UpdateReportData): Promise<ReportType> {
    return this.interventionService.updateInterventionReport(id, reportData);
  }


  async deleteIntervention(id: string): Promise<{ message: string }> {
    return this.interventionService.deleteIntervention(id);
  }

}