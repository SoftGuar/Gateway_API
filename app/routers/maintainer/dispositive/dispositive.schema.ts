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
  product_id: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};

// Propriétés d'un produit inclus dans les réponses
const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};


// Schéma pour récupérer tous les dispositifs
export const getDispositivesSchema = {
  tags: ['Maintainer : Dispositives management'],
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
  tags: ['Maintainer : Dispositives management'],
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



