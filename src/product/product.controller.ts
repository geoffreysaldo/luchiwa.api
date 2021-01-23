import { Body, Controller, Delete, Param, Get, Post, Put, Logger } from '@nestjs/common';
import { Product, ProductInput } from './product.interface';
import {ProductService} from './product.service';

@Controller('product')
export class ProductController {
    private logger = new Logger('ProductsController');
    constructor(private productService: ProductService){}

    @Get('id/:id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }

    @Get('/type/:type')
    getProductByType(@Param('type') type: string){
        return this.productService.getProductsByType(type);
    }

    @Get('/category/:category')
    getProductByCategory(@Param('category') category: string){
        return this.productService.getProductsByCategory(category);
    }

    @Get('/categories')
    getCategories(){
        return this.productService.getCategories();
    }

    @Get('/categories/:type')
    getCategoriesOfType(@Param('type') type: string) {
        return this.productService.getCategoriesOfType(type);
    }

    @Post()
    async createProduct(@Body() product: ProductInput) {
        return this.productService.createProduct(product);
    }

    @Post('/search')
    async autocomplete(@Body('searchProduct') searchProduct: string) {
        return this.productService.search(searchProduct);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }

    @Put()
    async updateProduct(@Body() product: Product){
        return this.productService.updateProduct(product);
    }
    

}
