import { Module } from '@nestjs/common';
import { LotsModule } from './lots/lots.module';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './auth/database/database.module';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    DatabaseModule, 
    LotsModule,
    CategoryModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    ReviewModule,
    SubcategoryModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class AppModule {}
