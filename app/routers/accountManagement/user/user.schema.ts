// app/routes/api/user.schema.ts
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

const UserType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

const UserWithHelpersType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  helpers: Type.Optional(Type.Array(HelperType))
});

export const createUserSchema = {
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: UserType
    })
  }
};

export const getUsersSchema = {
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(UserWithHelpersType)
    })
  }
};

export const getUserByIdSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateUserSchema = {
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
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserType
    })
  }
};

export const deleteUserSchema = {
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

export const getUserHelpersSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperType)
    })
  }
};

export const addHelperToUserSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    })
  }
};

export const removeHelperFromUserSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    })
  }
};