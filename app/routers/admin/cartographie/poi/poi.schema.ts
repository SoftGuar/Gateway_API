// ===== POI SCHEMAS =====
import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});


const categoryProperties = {
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
};

const poiProperties = {
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  category_id: Type.String(),
};

// Separate point properties for when we need coordinates
const poiWithCoordinatesProperties = {
  ...poiProperties,
  //x: Type.Number(),
  //y: Type.Number(),
};

// POST /pois
export const createPOISchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  body: Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    category_id: Type.String(),
    x: Type.Number(),
    y: Type.Number(),
    zone_ids: Type.Optional(Type.Array(Type.String())), // Many-to-many relationship
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(poiWithCoordinatesProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /pois/categories
export const getCategoriesSchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(categoryProperties))
    })
  }
};

// GET /pois/:id
export const getPOIByIdSchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(poiWithCoordinatesProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// PUT /pois/:id
export const updatePOISchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    category_id: Type.Optional(Type.String()),
    x: Type.Optional(Type.Number()),
    y: Type.Optional(Type.Number()),
    zone_ids: Type.Optional(Type.Array(Type.String()))
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(poiWithCoordinatesProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// DELETE /pois/:id
export const deletePOISchema = {
  tags: ['Cartographie : POI management'],
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

// GET /pois/search
export const searchPOIsSchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  querystring: Type.Object({
    query: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(poiWithCoordinatesProperties))
    })
  }
};

// GET /pois/floor/:floorId
export const getPOIsByFloorSchema = {
  tags: ['Cartographie : POI management'],
  headers: authHeader,
  params: Type.Object({
    floorId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(poiWithCoordinatesProperties))
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};