import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

const HelperType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

export const getUserHelpersSchema = {
  tags: ['User : Helper Management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperType)
    }),
    403: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    500: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const addHelperSchema = {
  tags: ['User : Helper Management'],
  headers: authHeader,
  params: Type.Object({
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        helpers: Type.Array(HelperType)
      })
    }),
    403: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    500: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const removeHelperSchema = {
  tags: ['User : Helper Management'],
  headers: authHeader,
  params: Type.Object({
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        helpers: Type.Array(HelperType)
      })
    }),
    403: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    500: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};