import { Type } from '@sinclair/typebox';

const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number()
};


const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Schema for creating a product
export const createProductSchema = {
  headers: authHeader,
  body: Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    price: Type.Number()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(
        productProperties
        )
    })
  }
};

// Schema for getting a product by ID
export const getProductSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(productProperties)
    })
  }
};

// Schema for updating a product
export const updateProductSchema = {
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    name: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    price: Type.Optional(Type.Number())
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(productProperties)
    })
  }
};

// Schema for deleting a product
export const deleteProductSchema = {
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