import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from '../entities/orders.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  lot_id?: number;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  user_id?: number;

  @IsOptional()
  @IsEnum(OrderStatus) 
  status?: OrderStatus;
}
