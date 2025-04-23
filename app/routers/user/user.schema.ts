import { Type } from '@sinclair/typebox';

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


const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

const HelperType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

});

const AssistanceType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

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
export const getAssistancesSchema = {
  tags: ['User :  get Assistances'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(AssistanceType)
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
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' }),
      
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
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' }),      
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

export const createHelperRecommendationSchema = {
  tags: ['User : Helper Recommendations'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: HelperRecommendationObject
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

