// ===== ZONE SCHEMAS =====
import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

const zoneTypeProperties = {
  id: Type.String(),
  name: Type.String(),
  properties: Type.Union([Type.Any(), Type.Null()]), // JSON field
};

const zoneProperties = {
  id: Type.String(),
  name: Type.String(),
  color: Type.String(),
  type_id: Type.String(),
  shape: Type.Any(), // JSON field
  floor_id: Type.String(),
};

// POST /zones
export const createZoneSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  body: Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String(),
    color: Type.String(),
    type_id: Type.String(),
    shape: Type.Any(), // JSON field for shapes array
    floor_id: Type.String()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(zoneProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /zones/types
export const getZoneTypesSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(zoneTypeProperties))
    })
  }
};

// GET /zones/:id
export const getZoneByIdSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(zoneProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// PUT /zones/:id
export const updateZoneSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    color: Type.Optional(Type.String()),
    type_id: Type.Optional(Type.String()),
    shape: Type.Optional(Type.Any()) // JSON field
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(zoneProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// DELETE /zones/:id
export const deleteZoneSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /zones/floor/:floorId
export const getZonesByFloorSchema = {
  tags: ['Cartographie : Zone management'],
  headers: authHeader,
  params: Type.Object({
    floorId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(zoneProperties))
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};






