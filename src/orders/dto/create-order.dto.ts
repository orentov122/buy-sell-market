import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from '../entities/orders.entity';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  lot_id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsPositive()
  price!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;
  
  @IsInt()
  @IsPositive()
  user_id!: number;
}
