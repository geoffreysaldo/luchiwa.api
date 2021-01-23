import { Product, ProductInput } from './product.interface';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    private logger;
    constructor(productService: ProductService);
    getProductById(id: string): import("rxjs").Observable<Product>;
    getProductByType(type: string): import("rxjs").Observable<any>;
    getProductByCategory(category: string): import("rxjs").Observable<any>;
    getCategories(): import("rxjs").Observable<any>;
    getCategoriesOfType(type: string): import("rxjs").Observable<any>;
    createProduct(product: ProductInput): Promise<import("rxjs").Observable<any>>;
    autocomplete(searchProduct: string): Promise<import("rxjs").Observable<any>>;
    deleteProduct(id: string): Promise<import("rxjs").Observable<Product>>;
    updateProduct(product: Product): Promise<import("rxjs").Observable<Product>>;
}
