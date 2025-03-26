import { AccountManagementService } from '../accountManagementService/accountManagement.service';
import { DispositiveService } from './dispositive.service';
import { ProductService } from './product.service';


import { 
  UserType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType 
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

  // Admin creates a helper
  async createHelper(helperData: CreateHelperData): Promise<HelperType> {
    return this.accountService.createHelper(helperData);
  }

  // Admin creates a decider
  async createDecider(deciderData: CreateDeciderData): Promise<DeciderType> {
    return this.accountService.createDecider(deciderData);
  }

  // Admin creates a commercial
  async createCommercial(commercialData: CreateCommercialData): Promise<CommercialType> {
    return this.accountService.createCommercial(commercialData);
  }

  // Admin creates a maintainer
  async createMaintainer(maintainerData: CreateMaintainerData): Promise<MaintainerType> {
    return this.accountService.createMaintainer(maintainerData);
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
