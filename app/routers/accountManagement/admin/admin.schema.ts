import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});


export const createAdminSchema = {
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
    privilege : Type.Number(),
    add_by: Type.Number(), 
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        privilege : Type.Number(),
        add_by: Type.Number(),
      })
    })
  }
};

export const getAdminsSchema = {
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
          privilege : Type.Number(),
          add_by: Type.Number(),
        })
      )
    })
  }
};

export const getAdminByIdSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
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
        privilege : Type.Number(),
        add_by: Type.Number(),
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateAdminSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
      privilege : Type.Optional(Type.Number()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
        privilege : Type.Number(),
        add_by: Type.Number(),
      })
    })
  }
};

export const deleteAdminSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    })
  }
};
