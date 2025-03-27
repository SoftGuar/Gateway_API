import { AccountManagementService } from '../accountManagementService/accountManagement.service';
import { DispositiveService } from './dispositive.service';
import { ProductService } from './product.service';


import { 
  UserType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType ,
  UserWithHelpersType
} from '../accountManagementService/types';
import { 
  DispositiveType, 
  ProductType
} from './types';


import { CreateUserData } from '../accountManagementService/user.service';
import { CreateDeciderData } from '../accountManagementService/decider.service';
import { CreateHelperData } from '../accountManagementService/helper.service';
import { CreateCommercialData } from '../accountManagementService/commercial.service';
import { CreateMaintainerData } from '../accountManagementService/maintainer.service';
import { CreateProductData } from './product.service';
import { CreateDispositiveData,BlockDispositiveInput } from './dispositive.service';


export class AdminService {
    private accountService: AccountManagementService;
    private dispositiveService: DispositiveService;
    private productService: ProductService;
  

  constructor() {
    this.accountService = new AccountManagementService();
    this.dispositiveService = new DispositiveService();
    this.productService = new ProductService();

  }

 // Admin creates a regular user
 async createUser(userData: CreateUserData): Promise<UserType> {
  return this.accountService.createUser(userData);
}

  async getUsers(): Promise<UserWithHelpersType[]> {
    return this.accountService.getUsers();
  }

  async getUserById(id: string): Promise<UserWithHelpersType> {
    return this.accountService.getUserById(id);
  }

  async updateUser(id: string, updateData: Partial<CreateUserData>): Promise<UserType> {
    return this.accountService.updateUser(id, updateData);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    return this.accountService.deleteUser(id);
  }

  async getUserHelpers(id: string): Promise<HelperType[]> {
    return this.accountService.getUserHelpers(id);
  }

  async addHelperToUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    return this.accountService.addHelperToUser(id, helperId);
  }

  async removeHelperFromUser(id: string, helperId: string): Promise<UserWithHelpersType> {
    return this.accountService.removeHelperFromUser(id, helperId);
  }



// Helper methods
async createHelper(helperData: CreateHelperData): Promise<HelperType> {
  return this.accountService.createHelper(helperData);
}

async getHelpers(): Promise<HelperType[]> {
  return this.accountService.getHelpers();
}

async getHelperById(id: string): Promise<HelperType> {
  return this.accountService.getHelperById(id);
}

async updateHelper(id: string, updateData: Partial<CreateHelperData>): Promise<HelperType> {
  return this.accountService.updateHelper(id, updateData);
}

async deleteHelper(id: string): Promise<{ message: string }> {
  return this.accountService.deleteHelper(id);
}

// Decider methods
async createDecider(deciderData: CreateDeciderData): Promise<DeciderType> {
  return this.accountService.createDecider(deciderData);
}

async getDeciders(): Promise<DeciderType[]> {
  return this.accountService.getDeciders();
}

async getDeciderById(id: string): Promise<DeciderType> {
  return this.accountService.getDeciderById(id);
}

async updateDecider(id: string, updateData: Partial<CreateDeciderData>): Promise<DeciderType> {
  return this.accountService.updateDecider(id, updateData);
}

async deleteDecider(id: string): Promise<{ message: string }> {
  return this.accountService.deleteDecider(id);
}

// Commercial methods
async createCommercial(CommercialData: CreateCommercialData): Promise<CommercialType> {
  return this.accountService.createCommercial(CommercialData);
}

async getCommercials(): Promise<CommercialType[]> {
  return this.accountService.getCommercials();
}

async getCommercialById(id: string): Promise<CommercialType> {
  return this.accountService.getCommercialById(id);
}

async updateCommercial(id: string, updateData: Partial<CreateCommercialData>): Promise<CommercialType> {
  return this.accountService.updateCommercial(id, updateData);
}

async deleteCommercial(id: string): Promise<{ message: string }> {
  return this.accountService.deleteCommercial(id);
}

// Maintainer methods
async createMaintainer(maintainerData: CreateMaintainerData): Promise<MaintainerType> {
  return this.accountService.createMaintainer(maintainerData);
}

async getMaintainers(): Promise<MaintainerType[]> {
  return this.accountService.getMaintainers();
}

async getMaintainerById(id: string): Promise<MaintainerType> {
  return this.accountService.getMaintainerById(id);
}

async updateMaintainer(id: string, updateData: Partial<CreateMaintainerData>): Promise<MaintainerType> {
  return this.accountService.updateMaintainer(id, updateData);
}

async deleteMaintainer(id: string): Promise<{ message: string }> {
  return this.accountService.deleteMaintainer(id);
}



    // Dispositive-related methods
    async createDispositive(dispositiveData: CreateDispositiveData): Promise<DispositiveType> {
      return this.dispositiveService.createDispositive(dispositiveData);
    }
  
    async getDispositives(): Promise<DispositiveType[]> {
      return this.dispositiveService.getDispositives();
    }
  
    async getDispositiveById(id: string): Promise<DispositiveType> {
      return this.dispositiveService.getDispositiveById(id);
    }
  
    async updateDispositive(id: string, updateData: Partial<CreateDispositiveData>): Promise<DispositiveType> {
      return this.dispositiveService.updateDispositive(id, updateData);
    }
  
    async deleteDispositive(id: string): Promise<{ message: string }> {
      return this.dispositiveService.deleteDispositive(id);
    }
  
    async assignUser(id: string,userId:string): Promise<DispositiveType> {
      return this.dispositiveService.assignUser(id,userId);
    }
  
    async toggleDispositiveBlock(id: string, data: BlockDispositiveInput): Promise<DispositiveType> {
      return this.dispositiveService.toggleDispositiveBlock(id, data);
    }
  
    async getDispositiveByProductId(id: string): Promise<DispositiveType[]> {
      return this.dispositiveService.getDispositiveByProductId(id);
    }
  
      // Product-related methods
  async createProduct(productData: CreateProductData): Promise<ProductType> {
    return this.productService.createProduct(productData);
  }

  async getProducts(): Promise<ProductType[]> {
    return this.productService.getProducts();
  }

  async getProductById(id: string): Promise<ProductType> {
    return this.productService.getProductById(id);
  }

  async updateProduct(id: string, updateData: Partial<CreateProductData>): Promise<ProductType> {
    return this.productService.updateProduct(id, updateData);
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    return this.productService.deleteProduct(id);
  }




}
