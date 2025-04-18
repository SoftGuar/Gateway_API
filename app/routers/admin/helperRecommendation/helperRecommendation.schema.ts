// routes/schemas/helperRecommendation.schema.ts
import { Type } from '@sinclair/typebox';
const authHeader = Type.Object({
    authorization: Type.String({ description: "Bearer token" })
  });
  
const HelperRecommendationObject = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  status: Type.String(),
  notes: Type.Optional(Type.String()),
  user_id: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
});


export const getHelperRecommendationsSchema = {
  tags: ['Admin : Helper Recommendations'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperRecommendationObject)
    }),
  }
};

export const getHelperRecommendationByIdSchema = {
  tags: ['Admin : Helper Recommendations'],   
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject
    }),
  }
};

export const approveHelperRecommendationSchema = {
  tags: ['Admin : Helper Recommendations'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    password: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        helper: Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' })
        }),
        recommendation: HelperRecommendationObject
      }),
      message: Type.String()
    }),
  }
};

export const rejectHelperRecommendationSchema = {
  tags: ['Admin : Helper Recommendations'],    
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    notes: Type.Optional(Type.String())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject,
      message: Type.String()
    }),
  }
};

export const deleteHelperRecommendationSchema = {
  tags: ['Admin : Helper Recommendations'],   
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
  }
};