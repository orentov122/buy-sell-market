import { IsBoolean, IsDate, IsNumber, Length, Max, Min } from "class-validator";

export class CreateLotsDto {
  id!: number;

  @Length(32)
  @Max(32)
  @Min(5)
  name!: string;

  @Length(100)
  @Max(100)
  @Min(0)
  desc!: string;

  @Length(100)
  @Max(100)
  @Min(0)
  detal_desc!: string;

  @IsBoolean()
  status!:boolean;
  
  @IsDate()
  created_at!:Date;

  @IsNumber()
  price!:number;
}