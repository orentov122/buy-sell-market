import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  lot_id!: number;


  @IsPositive()
  price!: number;

  @IsInt()
  @IsPositive()
  user_id!: number;
}
