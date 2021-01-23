import { ClientProxy } from '@nestjs/microservices';
import { Product, ProductInput } from './product.interface';
export declare class ProductService {
    private clientService;
    constructor(clientService: ClientProxy);
    getProductById(id: string): import("rxjs").Observable<Product>;
    getProductsByType(type: string): import("rxjs").Observable<any>;
    getProductsByCategory(category: string): import("rxjs").Observable<any>;
    getCategories(): import("rxjs").Observable<any>;
    getCategoriesOfType(type: any): import("rxjs").Observable<any>;
    createProduct(product: ProductInput): import("rxjs").Observable<any>;
    search(searchProduct: string): import("rxjs").Observable<any>;
    updateProduct(product: Product): import("rxjs").Observable<Product>;
    deleteProduct(id: string): import("rxjs").Observable<Product>;
}
