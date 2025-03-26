import { productService } from "../services/sales/productService";
import { orderService } from "../services/sales/orderService";
import { QuotationService } from "../services/sales/quotationService";
import { TransactionService } from "../services/sales/transactionService";
import dispositiveService from "../services/sales/dispositiveService";

describe("Sales Services Unit Tests", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    describe("ProductService", () => {
        it("should retrieve all products", async () => {
            const mockProducts = [{ id: 1, name: "Product A" }, { id: 2, name: "Product B" }];
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockProducts,
            });

            const products = await productService.getAllProducts();
            expect(products).toEqual(mockProducts);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/products"));
        });

        it("should retrieve a product by ID", async () => {
            const mockProduct = { id: 1, name: "Product A" };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockProduct,
            });

            const product = await productService.getProductById(1);
            expect(product).toEqual(mockProduct);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/products/1"));
        });
    });

    describe("OrderService", () => {
        it("should place an order", async () => {
            const mockOrder = { id: 1, status: "success" };
            const orderInput = { product_id: 1, user_id: 2, commercial_id: 3 };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockOrder,
            });

            const order = await orderService.order(orderInput);
            expect(order).toEqual(mockOrder);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/order"), expect.any(Object));
        });
    });

    describe("QuotationService", () => {
        it("should create a quotation", async () => {
            const mockQuotation = { id: 1, status: "created" };
            const quotationData = { user_id: 1, products: [{ productId: 1, count: 2 }] };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockQuotation,
            });

            const quotation = await QuotationService.createQuotation(quotationData);
            expect(quotation).toEqual(mockQuotation);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/quotations"), expect.any(Object));
        });

        it("should retrieve a quotation by ID", async () => {
            const mockQuotation = { id: 1, status: "created" };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockQuotation,
            });

            const quotation = await QuotationService.getQuotationById(1);
            expect(quotation).toEqual(mockQuotation);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/quotations/1"));
        });
    });

    describe("TransactionService", () => {
        it("should create a transaction", async () => {
            const mockTransaction = { id: 1, status: "completed" };
            const transactionData = { user_id: 1, amount: 100 };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockTransaction,
            });

            const transaction = await TransactionService.createTransaction(transactionData);
            expect(transaction).toEqual(mockTransaction);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/transactions"), expect.any(Object));
        });

        it("should retrieve transactions", async () => {
            const mockTransactions = [{ id: 1, status: "completed" }, { id: 2, status: "pending" }];
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockTransactions,
            });

            const transactions = await TransactionService.getTransactions();
            expect(transactions).toEqual(mockTransactions);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/transactions"));
        });
    });

    describe("DispositiveService", () => {
        it("should find an available dispositive", async () => {
            const mockDispositive = { id: 1, status: "available" };
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockDispositive,
            });

            const dispositive = await dispositiveService.findAvailableDispositive(1);
            expect(dispositive).toEqual(mockDispositive);
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/dispositives"));
        });
    });
});
