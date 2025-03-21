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

// Schema for getting all products
export const getAllProductsSchema = {
    headers: authHeader,
    response: {
      200: Type.Object({
        success: Type.Literal(true),
        data: Type.Array(
          Type.Object(productProperties)
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



