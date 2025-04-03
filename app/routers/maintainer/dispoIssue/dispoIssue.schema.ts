import { Type } from '@sinclair/typebox';

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Propriétés communes pour un dispoIssue
const dispoIssueProperties = {
  id: Type.String(),
  description: Type.String(),
  date: Type.String({ format: 'date-time' }),
  dispositiveId: Type.String(),
  maintainerId: Type.Union([Type.Number(), Type.Null()]),
  status: Type.String()
};


// Schémas pour les DispoIssues
export const getDispoIssuesSchema = {
  tags: ['Maintainer : DispoIssues management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(dispoIssueProperties))
    })
  }
};

export const getDispoIssueByIdSchema = {
  tags: ['Maintainer : DispoIssues management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(dispoIssueProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const getDispoIssuesByDispositiveIdSchema = {
  tags: ['Maintainer : DispoIssues management'],
  headers: authHeader,
  params: Type.Object({
    dispositiveId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(dispoIssueProperties))
    })
  }
};

