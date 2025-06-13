
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



const environmentProperties = {
  id: Type.String(),
  name: Type.String(),
  address: Type.Union([Type.String(), Type.Null()]),
};

// GET /environments
export const getEnvironmentsSchema = {
  tags: ['Cartographie : Environment management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          ...environmentProperties,
          floors: Type.Optional(Type.Array(Type.Object(floorProperties)))
        })
      )
    })
  }
};

// POST /environments
export const createEnvironmentSchema = {
  tags: ['Cartographie : Environment management'],
  headers: authHeader,
  body: Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String(),
    address: Type.Optional(Type.String())
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(environmentProperties)
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// GET /environments/:id
export const getEnvironmentByIdSchema = {
  tags: ['Cartographie : Environment management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...environmentProperties,
        floors: Type.Optional(Type.Array(Type.Object(floorProperties)))
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// PUT /environments/:id
export const updateEnvironmentSchema = {
  tags: ['Cartographie : Environment management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    address: Type.Optional(Type.String())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(environmentProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// DELETE /environments/:id
export const deleteEnvironmentSchema = {
  tags: ['Cartographie : Environment management'],
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
