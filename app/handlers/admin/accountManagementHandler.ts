import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';
import { UserActionService } from '../../services/accountManagementService/userAction.service';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: number;
      role: string;
    };
  }
}

const userActionService = new UserActionService();
const adminService = new AdminService();
const accountManagementService=new AccountManagementService();

interface BaseAccountData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

interface CreateUserData extends BaseAccountData {
  MAC: string;
}

// Handler for creating a regular user
export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserData, Params: { }, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createUser(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created a user' });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create user'
    });
  }
}
// Get all users
export async function getUsersHandler(
  request: FastifyRequest<{ Params: {},  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getUsers();
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Got users lists' });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch users'
    });
  }
}

// Get user by ID
export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: { id: string}, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getUserById(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch user'
    });
  }
}

// Update user
export async function updateUserHandler(
  request: FastifyRequest<{ 
    Params: { id: string}, user: { userId: number }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateUser(id, updateData);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Updated user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update user'
    });
  }
}

// Delete user
export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: string }, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteUser(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Deleted user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete user'
    });
  }
}

// Handler for getting user's helpers
export async function getUserHelpersHandler(
  request: FastifyRequest<{ Params: { id: string }, user: { userId: number }} >,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getUserHelpers(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got helpers for user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching helpers for user with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch user helpers'
    });
  }
}

// Handler for adding helper to user
export async function addHelperToUserHandler(
  request: FastifyRequest<{ Params: { id: string, helperId: string},  user: { userId: number } } >,
  reply: FastifyReply
) {
  try {
    const { id, helperId } = request.params;
    const result = await adminService.addHelperToUser(id, helperId);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Added helper with ID ${helperId} to user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error adding helper ${request.params.helperId} to user ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to add helper to user'
    });
  }
}

// Handler for removing helper from user
export async function removeHelperFromUserHandler(
  request: FastifyRequest<{ Params: { id: string, helperId: string },  user: { userId: number }} >,
  reply: FastifyReply
) {
  try {
    const { id, helperId } = request.params;
    const result = await adminService.removeHelperFromUser(id, helperId);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Removed helper with ID ${helperId} from user with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error removing helper ${request.params.helperId} from user ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to remove helper from user'
    });
  }
}

export async function createAssistanceHandler(
  request: FastifyRequest<{ Body: BaseAccountData, Params: { }, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createAssistance(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created an assistance' });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating assistance:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create assistance'
    });
  }
}




// Handler for creating a regular Helper
export async function createHelperHandler(
  request: FastifyRequest<{ Body: BaseAccountData, Params: {}, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createHelper(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created a helper' });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create helper'
    });
  }
}
// Get all helpers
export async function getHelpersHandler(
  request: FastifyRequest< { Params: {}, user: { userId: number }  }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getHelpers();
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Got helpers lists' });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching helpers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch helpers'
    });
  }
}

// Get helper by ID
export async function getHelperByIdHandler(
  request: FastifyRequest<{ Params: { id: string}, user: { userId: number } } >,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getHelperById(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got helper with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch helper'
    });
  }
}

// Update helper
export async function updateHelperHandler(
  request: FastifyRequest<{ 
    Params: { id: string} ,  user: { userId: number } , 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateHelper(id, updateData);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Updated helper with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update helper'
    });
  }
}

// Delete helper
export async function deleteHelperHandler(
  request: FastifyRequest<{ Params: { id: string },  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteHelper(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Deleted helper with ID ${id}` });
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete helper'
    });
  }
}


// Handler for creating a regular decider
export async function createDeciderHandler(
  request: FastifyRequest<{ Body: BaseAccountData , Params: { }, user: { userId: number }  }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createDecider(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created a decider' });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create decider'
    });
  }
}
// Get all deciders
export async function getDecidersHandler(
  request: FastifyRequest< { Params: { }, user: { userId: number }  }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getDeciders();
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Got deciders lists' });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching deciders:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch deciders'
    });
  }
}

// Get decider by ID
export async function getDeciderByIdHandler(
  request: FastifyRequest<{ Params: { id: string},  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getDeciderById(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got decider with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch decider'
    });
  }
}

// Update decider
export async function updateDeciderHandler(
  request: FastifyRequest<{ 
    Params: { id: string},  user: { userId: number } , 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateDecider(id, updateData);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Updated decider with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update decider'
    });
  }
}

// Delete decider
export async function deleteDeciderHandler(
  request: FastifyRequest<{ Params: { id: string },  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteDecider(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Deleted decider with ID ${id}` });
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete decider'
    });
  }
}


// Handler for creating a regular commercial
export async function createCommercialHandler(
  request: FastifyRequest<{ Body: BaseAccountData , Params: {}, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createCommercial(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created a commercial' });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create commercial'
    });
  }
}
// Get all commercials
export async function getCommercialsHandler(
  request: FastifyRequest<{ Params: {}, user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getCommercials();
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Got commercials lists' });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching commercials:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch commercials'
    });
  }
}

// Get commercial by ID
export async function getCommercialByIdHandler(
  request: FastifyRequest<{ Params: { id: string} ,  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getCommercialById(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got commercial with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch commercial'
    });
  }
}

// Update commercial
export async function updateCommercialHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, user: { userId: number } , 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateCommercial(id, updateData);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Updated commercial with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update commercial'
    });
  }
}

// Delete commercial
export async function deleteCommercialHandler(
  request: FastifyRequest<{ Params: { id: string },  user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteCommercial(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Deleted commercial with ID ${id}` });
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete commercial'
    });
  }
}

// Handler for creating a regular Maintainer
export async function createMaintainerHandler(
  request: FastifyRequest<{ Body: BaseAccountData , user: { userId: number } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createMaintainer(request.body);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Created a maintainer' });

    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create maintainer'
    });
  }
}
// Get all maintainers
export async function getMaintainersHandler(
  request: FastifyRequest< { Params: { user: { userId: number } } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getMaintainers();
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: 'Got maintainers lists' });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching Maintainers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch maintainers'
    });
  }
}

// Get maintainer by ID
export async function getMaintainerByIdHandler(
  request: FastifyRequest<{ Params: { id: string,  user: { userId: number } } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getMaintainerById(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Got maintainer with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch maintainer'
    });
  }
}

// Update maintainer
export async function updateMaintainerHandler(
  request: FastifyRequest<{ 
    Params: { id: string, user: { userId: number } }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateMaintainer(id, updateData);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Updated maintainer with ID ${id}` });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update maintainer'
    });
  }
}

// Delete maintainer
export async function deleteMaintainerHandler(
  request: FastifyRequest<{ Params: { id: string,  user: { userId: number } } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteMaintainer(id);
    if (!request.user || !request.user.userId) {
      return reply.code(400).send({
        success: false,
        message: 'Actor ID is required to log the action in history'
      });
    }
    await userActionService.logAction({ userId: request.user.userId, action: `Deleted maintainer with ID ${id}` });
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete maintainer'
    });
  }
}