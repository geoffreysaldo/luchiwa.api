import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { ProductService } from './product.service'

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
      }
    }
  ])],
  controllers: [ProductController],
  providers: [
    ProductService,
  ],
})
export class ProductModule {}
