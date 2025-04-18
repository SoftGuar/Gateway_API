import { Type } from '@sinclair/typebox';


const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Schema for confirming a product transaction
export const confirmProductTransactionSchema = {
    tags: ['admin: Transactions Management'],
    headers: authHeader,
    params: Type.Object({
      transaction_id: Type.Number(),
      dispositive_id: Type.Number()
    }),
    response: {
      200: Type.Object({
        success: Type.Literal(true),
        data: Type.Object({
          dispositive_id: Type.Number(),
          transaction_id: Type.Number(),
          isConfirmed: Type.Boolean(),
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' })
        })
      }),
      500: Type.Object({
        success: Type.Literal(false),
        message: Type.String()
      })
    }
  };