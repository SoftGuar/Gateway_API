import { AdminService } from '../services/adminService/admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let userId: string;
  let helperId: string;
  let deciderId: string;
  let commercialId: string;
  let maintainerId: string;
  let dispositiveId: string;
  let productId: string;
  
  // Set unique email/name for each test run
  const timestamp = Date.now();
  const testUserEmail = `test.user${timestamp}@example.com`;
  const testHelperEmail = `helper.test${timestamp}@example.com`;
  const testDeciderEmail = `decider.test${timestamp}@example.com`;
  const testCommercialEmail = `commercial.test${timestamp}@example.com`;
  const testMaintainerEmail = `maintainer.test${timestamp}@example.com`;
  const testProductName = `Test Product ${timestamp}`;
  const testDispositiveMAC = `MAC-${timestamp}`;

  beforeAll(() => {
    service = new AdminService();
  });

  // Clean up test data after all tests
  afterAll(async () => {
    try {
      if (dispositiveId) await service.deleteDispositive(dispositiveId);
      if (productId) await service.deleteProduct(productId);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('User Management', () => {
    test('should create a new user', async () => {
      const newUserData = {
        first_name: 'Test',
        last_name: 'User',
        email: testUserEmail,
        password: 'test1234',
        phone: '1234567890'
      };

      const user = await service.createUser(newUserData);
      userId = user.id.toString();

      console.log('User:', user);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.first_name).toBe(newUserData.first_name);
      expect(user.email).toBe(newUserData.email);
    });
  });

  describe('Helper Management', () => {
    test('should create a new helper', async () => {
      const newHelperData = {
        first_name: 'Helper',
        last_name: 'Test',
        email: testHelperEmail,
        password: 'helper1234',
        phone: '9876543210'
      };
      
      const helper = await service.createHelper(newHelperData);
      helperId = helper.id.toString();

      console.log('Helper:', helper);
      
      expect(helper).toBeDefined();
      expect(helper.id).toBeDefined();
      expect(helper.first_name).toBe(newHelperData.first_name);
      expect(helper.email).toBe(newHelperData.email);
    });
  });

  describe('Decider Management', () => {
    test('should create a new decider', async () => {
      const newDeciderData = {
        first_name: 'Decider',
        last_name: 'Test',
        email: testDeciderEmail,
        password: 'decider1234',
        phone: '5556667777'
      };
      
      const decider = await service.createDecider(newDeciderData);
      deciderId = decider.id.toString();

      console.log('Decider:', decider);
      
      expect(decider).toBeDefined();
      expect(decider.id).toBeDefined();
      expect(decider.first_name).toBe(newDeciderData.first_name);
      expect(decider.email).toBe(newDeciderData.email);
    });
  });

  describe('Commercial Management', () => {
    test('should create a new commercial', async () => {
      const newCommercialData = {
        first_name: 'Commercial',
        last_name: 'Test',
        email: testCommercialEmail,
        password: 'commercial1234',
        phone: '1112223333'
      };
      
      const commercial = await service.createCommercial(newCommercialData);
      commercialId = commercial.id.toString();

      console.log('Commercial:', commercial);
      
      expect(commercial).toBeDefined();
      expect(commercial.id).toBeDefined();
      expect(commercial.first_name).toBe(newCommercialData.first_name);
      expect(commercial.email).toBe(newCommercialData.email);
    });
  });

  describe('Maintainer Management', () => {
    test('should create a new maintainer', async () => {
      const newMaintainerData = {
        first_name: 'Maintainer',
        last_name: 'Test',
        email: testMaintainerEmail,
        password: 'maintainer1234',
        phone: '4445556666'
      };
      
      const maintainer = await service.createMaintainer(newMaintainerData);
      maintainerId = maintainer.id.toString();

      console.log('Maintainer:', maintainer);
      
      expect(maintainer).toBeDefined();
      expect(maintainer.id).toBeDefined();
      expect(maintainer.first_name).toBe(newMaintainerData.first_name);
      expect(maintainer.email).toBe(newMaintainerData.email);
    });
  });

  describe('Product Management', () => {
    test('should create a new product', async () => {
      const newProductData = {
        name: testProductName,
        description: 'Test Product Description',
        price: 99.99
      };
      
      const product = await service.createProduct(newProductData);
      productId = product.id.toString();

      console.log('Product:', product);
      
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBe(newProductData.name);
      expect(product.price).toBe(newProductData.price);
    });

    test('should get all products', async () => {
      const products = await service.getProducts();

      console.log('Products:', products);
      
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.some(product => product.id.toString() === productId)).toBe(true);
    });

    test('should get product by id', async () => {
      const product = await service.getProductById(productId);

      console.log('Product:', product);
      
      expect(product).toBeDefined();
      expect(product.id.toString()).toBe(productId);
      expect(product.name).toBe(testProductName);
    });

    test('should update product', async () => {
      const updatedData = {
        name: 'Updated Product Name'
      };
      
      const updatedProduct = await service.updateProduct(productId, updatedData);

      console.log('Updated Product:', updatedProduct);
      
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.id.toString()).toBe(productId);
      expect(updatedProduct.name).toBe('Updated Product Name');
    });
  });

  describe('Dispositive Management', () => {
    test('should create a new dispositive', async () => {
      
      const newDispositiveData = {
        type: 'Test Type',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
        initial_state: 'active',
        MAC: testDispositiveMAC,
        state: 'new',
        product_id: parseInt(productId)
      };
      
      const dispositive = await service.createDispositive(newDispositiveData);
      dispositiveId = dispositive.id.toString();

      console.log('Dispositive:', dispositive);
      
      expect(dispositive).toBeDefined();
      expect(dispositive.id).toBeDefined();
      expect(dispositive.MAC).toBe(testDispositiveMAC);
      expect(dispositive.product_id).toBe(parseInt(productId));
    });

    test('should get all dispositives', async () => {
      const dispositives = await service.getDispositives();

      console.log('Dispositives:', dispositives);
      
      expect(dispositives).toBeDefined();
      expect(Array.isArray(dispositives)).toBe(true);
      expect(dispositives.some(dispositive => dispositive.id.toString() === dispositiveId)).toBe(true);
    });

    test('should get dispositive by id', async () => {
      const dispositive = await service.getDispositiveById(dispositiveId);

      console.log('Dispositive:', dispositive);
      
      expect(dispositive).toBeDefined();
      expect(dispositive.id.toString()).toBe(dispositiveId);
      expect(dispositive.MAC).toBe(testDispositiveMAC);
    });

    test('should get dispositive by Product id', async () => {
        const productdispositives = await service.getDispositiveByProductId(productId);
  
        console.log('Dispositive:', productdispositives);
        
        expect(productdispositives).toBeDefined();
        expect(Array.isArray(productdispositives)).toBe(true);
        expect(productdispositives.some(d => d.id.toString() === dispositiveId.toString())).toBe(true);
    });
  

    test('should assign user to dispositive', async () => {
      const assignedDispositive = await service.assignUser(dispositiveId, userId);

      console.log('Assigned Dispositive:', assignedDispositive);
      
      expect(assignedDispositive).toBeDefined();
      expect(assignedDispositive.id.toString()).toBe(dispositiveId);
      expect(assignedDispositive.user_id).toBe(parseInt(userId));
    });

    test('should toggle dispositive block', async () => {
      const blockedDispositive = await service.toggleDispositiveBlock(dispositiveId, { blocked: true });

      console.log('Blocked Dispositive:', blockedDispositive);
      
      expect(blockedDispositive).toBeDefined();
      expect(blockedDispositive.id.toString()).toBe(dispositiveId);
      expect(blockedDispositive.state).toBe('BLOCKED');
    });

    test('should update dispositive', async () => {
      const updatedData = {
        type: 'Updated type'
      };
      
      const updatedDispositive = await service.updateDispositive(dispositiveId, updatedData);

      console.log('Updated Dispositive:', updatedDispositive);
      
      expect(updatedDispositive).toBeDefined();
      expect(updatedDispositive.id.toString()).toBe(dispositiveId);
      expect(updatedDispositive.type).toBe('Updated type');
    });
  });
});