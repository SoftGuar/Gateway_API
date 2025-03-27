// app/routes/api/user.schema.ts
import { Type } from '@sinclair/typebox';
const authHeader = Type.Object({
  authorization: Type.String({ description: "Bearer token" })
});

const HelperType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

const UserType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
});

const UserWithHelpersType = Type.Object({
  id: Type.Number(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: 'email' }),
  phone: Type.Optional(Type.String()),
  helpers: Type.Optional(Type.Array(HelperType))
});

export const createUserSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: UserType
    })
  }
};

export const getUsersSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(UserWithHelpersType)
    })
  }
};

export const getUserByIdSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateUserSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserType
    })
  }
};

export const deleteUserSchema = {
  tags: ['Admin : User Managment'],
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

export const getUserHelpersSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(HelperType)
    })
  }
};

export const addHelperToUserSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    })
  }
};

export const removeHelperFromUserSchema = {
  tags: ['Admin : User Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String(),
    helperId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: UserWithHelpersType
    })
  }
};

export const createDeciderSchema = {
  tags: ['Admin : Decider Managment'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const getDecidersSchema = {
  tags: ['Admin : Decider Managment'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
        })
      )
    })
  }
};

export const getDeciderByIdSchema = {
  tags: ['Admin : Decider Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
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
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateDeciderSchema = {
  tags: ['Admin : Decider Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const deleteDeciderSchema = {
  tags: ['Admin : Decider Managment'],
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

export const createHelperSchema = {
  tags: ['Admin : Helper Managment'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const getHelpersSchema = {
  tags: ['Admin : Helper Managment'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
        })
      )
    })
  }
};

export const getHelperByIdSchema = {
  tags: ['Admin : Helper Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
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
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateHelperSchema = {
  tags: ['Admin : Helper Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const deleteHelperSchema = {
  tags: ['Admin : Helper Managment'],
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
export const createMaintainerSchema = {
  tags: ['Admin : Maintainer Managment'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const getMaintainersSchema = {
  tags: ['Admin : Maintainer Managment'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
        })
      )
    })
  }
};

export const getMaintainerByIdSchema = {
  tags: ['Admin : Maintainer Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
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
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateMaintainerSchema = {
  tags: ['Admin : Maintainer Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const deleteMaintainerSchema = {
  tags: ['Admin : Maintainer Managment'],
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

export const createCommercialSchema = {
  tags: ['Admin : Commercial Managment'],
  headers: authHeader,
  body: Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({ format: 'email' }),
    password: Type.String(),
    phone: Type.Optional(Type.String()),
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const getCommercialsSchema = {
  tags: ['Admin : Commercial Managment'],
  headers: authHeader,
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          first_name: Type.String(),
          last_name: Type.String(),
          email: Type.String({ format: 'email' }),
          phone: Type.Optional(Type.String()),
        })
      )
    })
  }
};

export const getCommercialByIdSchema = {
  tags: ['Admin : Commercial Managment'],
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
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
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateCommercialSchema = {
  tags: ['Admin : Commercial Managment'], 
  headers: authHeader,
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      first_name: Type.String(),
      last_name: Type.String(),
      email: Type.String({ format: 'email' }),
      password: Type.String(),
      phone: Type.Optional(Type.String()),
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String({ format: 'email' }),
        phone: Type.Optional(Type.String()),
      })
    })
  }
};

export const deleteCommercialSchema = {
  tags: ['Admin : Commercial Managment'],
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
