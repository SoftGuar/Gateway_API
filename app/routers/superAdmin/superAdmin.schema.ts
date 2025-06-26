import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

const AdminType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  privilege: Type.Number()
});

const GetAdminType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  privilege: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
});

export const createAdminSchema = {
  tags: ['SuperAdmin : Administrators Management'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
    privilege: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: AdminType
    })
  }
};

export const getAdminsSchema = {
  tags: ['SuperAdmin : Administrators Management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(GetAdminType)
    })
  }
};

export const getAdminByIdSchema = {
  tags: ['SuperAdmin : Administrators Management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: GetAdminType
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateAdminSchema = {
  tags: ['SuperAdmin : Administrators Management'],
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
      privilege: Type.Number()
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: AdminType
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const deleteAdminSchema = {
  tags: ['SuperAdmin : Administrators Management'],
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