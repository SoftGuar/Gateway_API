
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
  tags: ['User : Environment management'],
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


// GET /environments/:id
export const getEnvironmentByIdSchema = {
  tags: ['User : Environment management'],
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


export const navigateSchema = {
  tags: ['User : Environment management'],
  headers: authHeader,
  body: Type.Object({
    floor: Type.String(),
    poi: Type.String(),
    poi1: Type.Optional(Type.String()),
    x_start: Type.Optional(Type.Number()),
    y_start: Type.Optional(Type.Number()),
    current_orientation: Type.Optional(Type.Number())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Any()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const navigateWithObstacleSchema = {
  tags: ['User : Environment management'],
  headers: authHeader,
  body: Type.Object({
    floor: Type.String(),
    poi: Type.String(),
    x: Type.Number(),
    y: Type.Number(),
    distance: Type.Number(),
    orientation: Type.Number(),
    environment: Type.Optional(Type.String())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Any()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};