import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: 'Bearer token' })
});

const profileSchema = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

});

export const getProfileSchema = {
  summary: 'Retrieve Profile',
  description: 'Fetches the current user profile based on the provided Bearer token.',
  tags: ['Account Management: Profile'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: profileSchema
    }),
    401: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateProfileSchema = {
  summary: 'Update Profile',
  description: 'Updates the current user profile with the provided data.',
  tags: ['Account Management: Profile'],
  headers: authHeader,
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      phone: Type.Optional(Type.String())
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: profileSchema
    }),
    401: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const deleteProfileSchema = {
  summary: 'Delete Profile',
  description: 'Deletes the current user profile based on the provided Bearer token.',
  tags: ['Account Management: Profile'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    401: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};