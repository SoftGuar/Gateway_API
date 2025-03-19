import { Type } from '@sinclair/typebox';

export const loginSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    role: Type.Union([
        Type.Literal('user'),
        Type.Literal('admin'),
        Type.Literal('superAdmin'),
        Type.Literal('maintainer'),
        Type.Literal('commercial'),
        Type.Literal('helper'),
        Type.Literal('decider')
      ])
    }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        token: Type.String()
      })
    }),
    401: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};