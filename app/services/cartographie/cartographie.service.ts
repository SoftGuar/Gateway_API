import { Config } from '../../services.config';
import { EnvironmentService } from './envirement.service';
import { FloorService } from './floor.service';
import { FloorPlanService } from './floor_plan_processing.service';
import { POIService } from './poi.service';
import { ZoneService } from './zones.service';
import { NavigationService } from './navigation.service';

export class CartographieService {
  private baseUrl: string;
  public environment: EnvironmentService;
  public floor: FloorService;
  public floorPlan: FloorPlanService;
  public poi: POIService;
  public zone: ZoneService;
  public navigation: NavigationService;

  constructor() {
    this.baseUrl = Config.getInstance().getCartographieServiceIP();
    
    // Initialiser tous les sous-services
    this.environment = new EnvironmentService(this.baseUrl);
    this.floor = new FloorService(this.baseUrl);
    this.floorPlan = new FloorPlanService(this.baseUrl);
    this.poi = new POIService(this.baseUrl);
    this.zone = new ZoneService(this.baseUrl);
    this.navigation = new NavigationService(this.baseUrl);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}