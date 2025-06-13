// ===== FLOOR SCHEMAS =====
import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});


const floorProperties = {
  id: Type.String(),
  name: Type.String(),
  building: Type.Union([Type.String(), Type.Null()]),
  level: Type.Union([Type.Integer(), Type.Null()]),
  environment_id: Type.String(),
  width: Type.Number(),
  height: Type.Number(),
  coordinates: Type.Any(),
  grid_data: Type.Any(),
  grid_dimensions: Type.Any(),
  image_data: Type.Optional(Type.Union([Type.String(), Type.Null()]))
};


// GET /floors
export const getFloorsSchema = {
  tags: ['Cartographie : Floor management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(floorProperties))
    })
  }
};

// POST /floors
export const createFloorSchema = {
  tags: ['Cartographie : Floor management'],
  headers: authHeader,
  body: Type.Object({
    id: Type.Optional(Type.String()),
    environment_id: Type.String(),
    name: Type.String(),
    building: Type.Optional(Type.String()),
    level: Type.Optional(Type.Integer()),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
    coordinates: Type.Optional(Type.String()), // JSON string
    grid_data: Type.Optional(Type.String()), // JSON string
    grid_dimensions: Type.Optional(Type.String()), // JSON string
    image_data: Type.Optional(Type.String()) // Base64 string
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(floorProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /floors/:id
export const getFloorByIdSchema = {
  tags: ['Cartographie : Floor management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(floorProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// PUT /floors/:id
export const updateFloorSchema = {
  tags: ['Cartographie : Floor management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    building: Type.Optional(Type.String()),
    level: Type.Optional(Type.Integer()),
    width: Type.Optional(Type.Number()),
    height: Type.Optional(Type.Number()),
    coordinates: Type.Optional(Type.String()),
    grid_data: Type.Optional(Type.String()),
    grid_dimensions: Type.Optional(Type.String()),
    image_data: Type.Optional(Type.String())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(floorProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /floors/:id/image
export const getFloorImageSchema = {
  tags: ['Cartographie : Floor management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.String({ description: "Base64 encoded image" })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};