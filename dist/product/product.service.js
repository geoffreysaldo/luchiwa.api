"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let ProductService = class ProductService {
    constructor(clientService) {
        this.clientService = clientService;
    }
    getProductById(id) {
        return this.clientService.send("getProductById", id);
    }
    getProductsByType(type) {
        return this.clientService.send("getProductsByType", type);
    }
    getProductsByCategory(category) {
        return this.clientService.send("getProductsByCategory", category);
    }
    getCategories() {
        return this.clientService.send("getCategories", "null");
    }
    getCategoriesOfType(type) {
        return this.clientService.send("getCategoriesOfType", type);
    }
    createProduct(product) {
        return this.clientService.send("createProduct", product);
    }
    search(searchProduct) {
        return this.clientService.send("searchByKeyword", searchProduct);
    }
    updateProduct(product) {
        return this.clientService.send("updateProduct", product);
    }
    deleteProduct(id) {
        return this.clientService.send('deleteProduct', id);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PRODUCT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map