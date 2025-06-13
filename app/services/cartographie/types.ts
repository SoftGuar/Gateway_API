// Environment Types
export interface EnvironmentType {
  id: string;
  name: string;
  address?: string;
  floors?: Floor[];
}

export interface EnvironmentCreateData {
  id?: string;
  name: string;
  address?: string;
}

// Floor Types
export interface FloorType {
  id: string;
  name: string;
  environment_id: string;
  width: number;
  height: number;
  coordinates?: any;
  grid_data?: any;
  grid_dimensions?: any;
  image_data?: string;
}

export interface Floor {
  id: string;
  name: string;
  environment_id: string;
  width: number;
  height: number;
  coordinates?: any;
  grid_data?: any;
  grid_dimensions?: any;
  image_data?: string;
}

export interface FloorCreateData {
  id?: string;
  name: string;
  environment_id: string;
  width: number;
  height: number;
  coordinates?: any;
  grid_data?: any;
  grid_dimensions?: any;
  image_data?: string;
}

export interface FloorUpdateData {
  grid_data?: any;
  grid_dimensions?: any;
  image_data?: string;
}

// Floor Plan Processing Types
export interface FloorPlanProcessOptions {
  grid_size?: number;
  include_text_removal?: boolean;
  include_walls_detection?: boolean;
  include_furniture_detection?: boolean;
  include_doors_detection?: boolean;
}

export interface FloorPlanProcessResult {
  grid: number[][];
  grid_dimensions: number[];
  grid_size: number;
  original_image: string;
  no_text_image: string;
  walls_only: string;
  black_furniture: string;
  grid_visual: string;
  grid_with_lines: string;
  no_walls_doors: string;
}

// POI Types
export interface POIType {
  id: string;
  name: string;
  description?: string;
  category_id: string;
  x: number;
  y: number;
  point_id?: string;
}

export interface POICreateData {
  name: string;
  description?: string;
  category_id: string;
  x: number;
  y: number;
  zone_id?: string;
  floor_id: string;
}

export interface POIUpdateData {
  name?: string;
  description?: string;
  category_id?: string;
  x?: number;
  y?: number;
}

export interface CategoryType {
  id: string;
  name: string;
  description?: string;
}

// Zone Types
export interface ZoneType {
  id: string;
  name: string;
  color: string;
  type_id: string;
  shape: any[];
  floor_id: string;
}

export interface ZoneCreateData {
  id?: string;
  name: string;
  color: string;
  type_id: string;
  shape: any[];
  floor_id: string;
}

export interface ZoneUpdateData {
  name?: string;
  color?: string;
  type_id?: string;
  shape?: any[];
}

export interface ZoneTypeResponse {
  id: string;
  name: string;
  description?: string;
}