// app/routes/api/user.schema.ts
import { Type } from '@sinclair/typebox';
const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});


const UserType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  MAC:Type.String(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
});



export const getHelperUsersSchema = {
  tags: ['helper : get users'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(UserType)
    })
  }
};

