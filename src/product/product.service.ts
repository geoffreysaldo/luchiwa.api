import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Product, ProductInput } from './product.interface';

@Injectable()
export class ProductService {

    constructor(@Inject('PRODUCT_SERVICE') private clientService: ClientProxy){}

    public getProductById(id: string) {
        return this.clientService.send<Product, string>("getProductById", id);
    }

    public getProductsByType(type: string) {
        return this.clientService.send<any, string>("getProductsByType", type);
    }

    public getProductsByCategory(category: string) {
        return this.clientService.send<any, string>("getProductsByCategory", category);
    }

    public getCategories() {
        return this.clientService.send<any, string>("getCategories", "null");
    }

    public getCategoriesOfType(type) {
        return this.clientService.send<any, string>("getCategoriesOfType", type);
    }

    public createProduct(product: ProductInput) {
        return this.clientService.send<any, any>("createProduct", product);
    }

    public search(searchProduct: string) {
        return this.clientService.send<any, string>("searchByKeyword", searchProduct);
    }

    public updateProduct(product: Product) {
        return this.clientService.send<Product, Product>("updateProduct", product);
    }

    public deleteProduct(id: string) {
        return this.clientService.send<Product, string>('deleteProduct', id);
    }
}
