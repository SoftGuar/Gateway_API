import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Propriétés communes pour un dispositif
const dispositiveProperties = {
  id: Type.Number(),
  type: Type.String(),
  start_date: Type.String({ format: 'date-time' }),
  end_date: Type.String({ format: 'date-time' }),
  initial_state: Type.String(),
  MAC: Type.String(),
  state: Type.String(),
  user_id: Type.Union([Type.Number(), Type.Null()]),
  product_id: Type.Number()
};

// Propriétés d'un produit inclus dans les réponses
const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number()
};

// Schéma pour la création d'un dispositif
export const createDispositiveSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  body: Type.Object({
    type: Type.String(),
    start_date: Type.String({ format: 'date-time' }),
    end_date: Type.String({ format: 'date-time' }),
    initial_state: Type.String(),
    MAC: Type.String(),
    state: Type.String(),
    product_id: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour récupérer tous les dispositifs
export const getDispositivesSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          ...dispositiveProperties,
          Product: Type.Object(productProperties)
        })
      )
    })
  }
};

// Schéma pour récupérer un dispositif par ID
export const getDispositiveByIdSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour récupérer les dispositifs liés à un produit
export const getDispositivesByProductSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  params: Type.Object({
    productId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          ...dispositiveProperties,
          Product: Type.Object(productProperties)
        })
      )
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour mettre à jour un dispositif
export const updateDispositiveSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      type: Type.String(),
      start_date: Type.String({ format: 'date-time' }),
      end_date: Type.String({ format: 'date-time' }),
      initial_state: Type.String(),
      MAC: Type.String(),
      state: Type.String(),
      product_id: Type.Number()
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour assigner un utilisateur à un dispositif
export const assignUserSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    user_id: Type.Union([Type.Number(), Type.Null()])
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour bloquer un dispositif
export const blockDispositiveSchema = {
  tags: ['Admin : Dispositives management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    blocked: Type.Boolean(),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        ...dispositiveProperties,
        Product: Type.Object(productProperties)
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

// Schéma pour supprimer un dispositif
export const deleteDispositiveSchema = {
  tags: ['Admin : Dispositives management'],
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
