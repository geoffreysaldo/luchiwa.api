"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./auth/user.entity");
const auth_admin_module_1 = require("./auth-admin/auth-admin.module");
const admin_entity_1 = require("./auth-admin/admin.entity");
const microservices_1 = require("@nestjs/microservices");
const product_service_1 = require("./product/product.service");
const product_module_1 = require("./product/product.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                database: 'user',
                entities: [user_entity_1.User, admin_entity_1.Admin],
                synchronize: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            auth_admin_module_1.AuthAdminModule,
            product_module_1.ProductModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'PRODUCT_SERVICE',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        url: 'nats://localhost:4222',
                    }
                }
            ])
        ],
        controllers: [app_controller_1.AppController],
        providers: [product_service_1.ProductService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map