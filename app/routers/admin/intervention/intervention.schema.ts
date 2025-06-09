import { Type } from '@sinclair/typebox';
import { InterventionStatus} from '../../../services/monitoringService/types'

const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

// Schema for intervention report
const reportProperties = {
  id: Type.Number(),
  interventionId: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
};

// Common properties for an intervention
const interventionProperties = {
  id: Type.String(),
  description: Type.String(),
  type: Type.String(),
  start_date: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
  end_date: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
  status: Type.Enum(InterventionStatus),
  idDispositive: Type.String(),
  idMaintainer: Type.String(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' }),

  // Include the report in the response
  report: Type.Object(reportProperties)
};

// Schemas for Interventions
export const getAllInterventionsSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(interventionProperties))
    })
  }
};

export const getInterventionByIdSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(interventionProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const getInterventionsByMaintainerIdSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    maintainerId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(interventionProperties))
    })
  }
};
export const getInterventionsByDeviceIdSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    dispositiveId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(Type.Object(interventionProperties))
    })
  }
};


export const createInterventionSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  body: Type.Object({
    description: Type.String(),
    type: Type.String(),
    start_date: Type.Optional(Type.String({ format: 'date-time' })),
    end_date: Type.Optional(Type.String({ format: 'date-time' })),
    status: Type.Enum(InterventionStatus, { default: 'pending' }),
    idMaintainer: Type.String(),
    idDispositive: Type.String()
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(interventionProperties)
    })
  }
};

export const updateInterventionSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    description: Type.Optional(Type.String()),
    start_date: Type.Optional(Type.String({ format: 'date-time' })),
    end_date: Type.Optional(Type.String({ format: 'date-time' })),
    type: Type.Optional(Type.String()),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(interventionProperties)
    })
  }
};

export const updateInterventionStatusSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    status: Type.Enum(InterventionStatus, { default: 'pending' }),
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(interventionProperties)
    })
  }
};

// schema for updating intervention reports
export const updateInterventionReportSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    title: Type.String(),
    description: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object(reportProperties)
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const deleteInterventionSchema = {
  tags: ['Admin : Interventions management'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        message: Type.String()
      })
    })
  }
};