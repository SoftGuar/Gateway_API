import { Config } from './app/services.config';
const config = Config.getInstance();
console.log(`Admin service IP: ${config.getadminServiceIP()}`);

import { AdminService } from './app/services/adminService/admin.service';
import { 
  UserType, 
  HelperType, 
  DeciderType, 
  CommercialType, 
  MaintainerType,
} from './app/services/accountManagementService/types';
import {
  DispositiveType,
  ProductType
} from './app/services/adminService/types';

import { CreateUserData } from './app/services/accountManagementService/user.service';
import { CreateHelperData } from './app/services/accountManagementService/helper.service';
import { CreateDeciderData } from './app/services/accountManagementService/decider.service';
import { CreateCommercialData } from './app/services/accountManagementService/commercial.service';
import { CreateMaintainerData } from './app/services/accountManagementService/maintainer.service';
import { CreateProductData } from './app/services/adminService/product.service';
import { CreateDispositiveData, BlockDispositiveInput } from './app/services/adminService/dispositive.service';

const service = new AdminService();

// User Management Tests
async function testCreateUser(): Promise<UserType | undefined> {
  const newUserData: CreateUserData = {
    first_name: 'Admin Test',
    last_name: 'User',
    email: `admin.test.user${Date.now()}@example.com`,
    password: 'admintest1234',
    phone: '1234567890'
  };

  try {
    const user = await service.createUser(newUserData);
    console.log('testCreateUser:', user);
    return user;
  } catch (error) {
    console.error('testCreateUser Error:', error);
    return undefined;
  }
}

async function testCreateHelper(): Promise<HelperType | undefined> {
  const newHelperData: CreateHelperData = {
    first_name: 'Admin Test',
    last_name: 'Helper',
    email: `admin.test.helper${Date.now()}@example.com`,
    password: 'admintest1234',
    phone: '2345678901'
  };

  try {
    const helper = await service.createHelper(newHelperData);
    console.log('testCreateHelper:', helper);
    return helper;
  } catch (error) {
    console.error('testCreateHelper Error:', error);
    return undefined;
  }
}

async function testCreateDecider(): Promise<DeciderType | undefined> {
  const newDeciderData: CreateDeciderData = {
    first_name: 'Admin Test',
    last_name: 'Decider',
    email: `admin.test.decider${Date.now()}@example.com`,
    password: 'admintest1234',
    phone: '3456789012'
  };

  try {
    const decider = await service.createDecider(newDeciderData);
    console.log('testCreateDecider:', decider);
    return decider;
  } catch (error) {
    console.error('testCreateDecider Error:', error);
    return undefined;
  }
}

async function testCreateCommercial(): Promise<CommercialType | undefined> {
  const newCommercialData: CreateCommercialData = {
    first_name: 'Admin Test',
    last_name: 'Commercial',
    email: `admin.test.commercial${Date.now()}@example.com`,
    password: 'admintest1234',
    phone: '4567890123'
  };

  try {
    const commercial = await service.createCommercial(newCommercialData);
    console.log('testCreateCommercial:', commercial);
    return commercial;
  } catch (error) {
    console.error('testCreateCommercial Error:', error);
    return undefined;
  }
}

async function testCreateMaintainer(): Promise<MaintainerType | undefined> {
  const newMaintainerData: CreateMaintainerData = {
    first_name: 'Admin Test',
    last_name: 'Maintainer',
    email: `admin.test.maintainer${Date.now()}@example.com`,
    password: 'admintest1234',
    phone: '5678901234'
  };

  try {
    const maintainer = await service.createMaintainer(newMaintainerData);
    console.log('testCreateMaintainer:', maintainer);
    return maintainer;
  } catch (error) {
    console.error('testCreateMaintainer Error:', error);
    return undefined;
  }
}

// Product Tests
async function testCreateProduct(): Promise<ProductType | undefined> {
  const newProductData: CreateProductData = {
    name: 'Test Product',
    description: 'A test product created by AdminService',
    price: 99.99
  };

  try {
    const product = await service.createProduct(newProductData);
    console.log('testCreateProduct:', product);
    return product;
  } catch (error) {
    console.error('testCreateProduct Error:', error);
    return undefined;
  }
}

async function testGetProducts() {
  try {
    const products = await service.getProducts();
    console.log('testGetProducts:', products);
    return products;
  } catch (error) {
    console.error('testGetProducts Error:', error);
  }
}

async function testGetProductById(productId: string) {
  try {
    const product = await service.getProductById(productId);
    console.log('testGetProductById:', product);
    return product;
  } catch (error) {
    console.error('testGetProductById Error:', error);
  }
}

async function testUpdateProduct(productId: string) {
  try {
    const updatedProduct = await service.updateProduct(productId, {
      name: 'Updated Test Product',
      price: 129.99
    });
    console.log('testUpdateProduct:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('testUpdateProduct Error:', error);
  }
}

async function testDeleteProduct(productId: string) {
  try {
    const response = await service.deleteProduct(productId);
    console.log('testDeleteProduct:', response);
    return response;
  } catch (error) {
    console.error('testDeleteProduct Error:', error);
  }
}

// Dispositive Tests
async function testCreateDispositive(productId: number): Promise<DispositiveType | undefined> {
  const now = new Date();
  const endDate = new Date();
  endDate.setFullYear(now.getFullYear() + 1); // One year from now
  
  const newDispositiveData: CreateDispositiveData = {
    type: 'TestDevice',
    start_date: now.toISOString(),
    end_date: endDate.toISOString(),
    initial_state: 'New',
    MAC: '00:11:22:33:44:55',
    state: 'Active',
    product_id: productId
  };

  try {
    const dispositive = await service.createDispositive(newDispositiveData);
    console.log('testCreateDispositive:', dispositive);
    return dispositive;
  } catch (error) {
    console.error('testCreateDispositive Error:', error);
    return undefined;
  }
}

async function testGetDispositives() {
  try {
    const dispositives = await service.getDispositives();
    console.log('testGetDispositives:', dispositives);
    return dispositives;
  } catch (error) {
    console.error('testGetDispositives Error:', error);
  }
}

async function testGetDispositiveById(dispositiveId: string) {
  try {
    const dispositive = await service.getDispositiveById(dispositiveId);
    console.log('testGetDispositiveById:', dispositive);
    return dispositive;
  } catch (error) {
    console.error('testGetDispositiveById Error:', error);
  }
}

async function testGetDispositiveByProductId(productId: string) {
  try {
    const dispositive = await service.getDispositiveByProductId(productId);
    console.log('testGetDispositiveByProductId:', dispositive);
    return dispositive;
  } catch (error) {
    console.error('testGetDispositiveByProductId Error:', error);
  }
}

async function testUpdateDispositive(dispositiveId: string) {
  try {
    const updatedDispositive = await service.updateDispositive(dispositiveId, {
      state: 'Maintenance',
      type: 'UpdatedTestDevice'
    });
    console.log('testUpdateDispositive:', updatedDispositive);
    return updatedDispositive;
  } catch (error) {
    console.error('testUpdateDispositive Error:', error);
  }
}

async function testToggleDispositiveBlock(dispositiveId: string, blocked: boolean) {
  try {
    const blockData: BlockDispositiveInput = {
      blocked: blocked
    };
    const dispositive = await service.toggleDispositiveBlock(dispositiveId, blockData);
    console.log(`testToggleDispositiveBlock (${blocked ? 'block' : 'unblock'}):`, dispositive);
    return dispositive;
  } catch (error) {
    console.error(`testToggleDispositiveBlock (${blocked ? 'block' : 'unblock'}) Error:`, error);
  }
}

async function testAssignUser(dispositiveId: string, userId: string) {
  try {
    const dispositive = await service.assignUser(dispositiveId,userId);
    console.log('testAssignUser:', dispositive);
    return dispositive;
  } catch (error) {
    console.error('testAssignUser Error:', error);
  }
}

async function testDeleteDispositive(dispositiveId: string) {
  try {
    const response = await service.deleteDispositive(dispositiveId);
    console.log('testDeleteDispositive:', response);
    return response;
  } catch (error) {
    console.error('testDeleteDispositive Error:', error);
  }
}

async function runTests() {
  let userId = null;
  console.log("==================== USER MANAGEMENT TESTS ====================");
  // Test user creation 
  const createdUser = await testCreateUser();
  if (!createdUser) {
    console.error('User creation failed. This might affect other tests.');
  }
  else{
   userId = createdUser.id.toString();
  }


  // Test helper creation
  const createdHelper = await testCreateHelper();
  if (!createdHelper) {
    console.error('Helper creation failed. This might affect other tests.');
  }
  
  // Test decider creation
  const createdDecider = await testCreateDecider();
  if (!createdDecider) {
    console.error('Decider creation failed. This might affect other tests.');
  }
  
  // Test commercial creation
  const createdCommercial = await testCreateCommercial();
  if (!createdCommercial) {
    console.error('Commercial creation failed. This might affect other tests.');
  }
  
  // Test maintainer creation
  const createdMaintainer = await testCreateMaintainer();
  if (!createdMaintainer) {
    console.error('Maintainer creation failed. This might affect other tests.');
  }
  
  console.log("\n==================== PRODUCT TESTS ====================");
  // Create a product for testing product-related functionality
  const createdProduct = await testCreateProduct();
  if (!createdProduct) {
    console.error('Product creation failed. This might affect dispositive tests.');
  } else {
    const productId = createdProduct.id.toString();
    
    // Test getting all products
    await testGetProducts();
    
    // Test getting product by ID
    await testGetProductById(productId);
    
    // Test updating product
    await testUpdateProduct(productId);
    
    console.log("\n==================== DISPOSITIVE TESTS ====================");
    // Create a dispositive linked to the product
    if (createdProduct) {
      const createdDispositive = await testCreateDispositive(createdProduct.id);
      if (!createdDispositive) {
        console.error('Dispositive creation failed. Skipping dispositive tests.');
      } else {
        const dispositiveId = createdDispositive.id.toString();
        
        // Test getting all dispositives
        await testGetDispositives();
        
        // Test getting dispositive by ID
        await testGetDispositiveById(dispositiveId);
        
        // Test getting dispositive by product ID
        await testGetDispositiveByProductId(productId);
        
        // Test updating dispositive
        await testUpdateDispositive(dispositiveId);
        
        // Test blocking dispositive
        await testToggleDispositiveBlock(dispositiveId, true);
        
        // Test unblocking dispositive
        await testToggleDispositiveBlock(dispositiveId, false);
        
        // Test assigning user to dispositive
        if (userId !== null) {
          await testAssignUser(dispositiveId, userId);
        } else {
          console.error("User ID is null, skipping user assignment.");
        }
       
        
        // Test deleting dispositive
        await testDeleteDispositive(dispositiveId);
      }
    }
    
    // Test deleting product
    await testDeleteProduct(productId);
  }
}

runTests().catch(error => {
  console.error('Error running tests:', error);
});