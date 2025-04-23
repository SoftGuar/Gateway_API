import { Type } from '@sinclair/typebox';

const productProperties = {
  id: Type.Number(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  price: Type.Number(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })

};


const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Schema for getting all products
export const getAllProductsSchema = {
    tags: ['Commercial : Product management'],
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
  summary: "Get product details by ID",
  description: "Retrieves detailed information about a product by providing its unique ID.",
  tags: ['Commercial : Product management'],
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



