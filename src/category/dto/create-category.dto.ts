import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  category_name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 1000)
  category_description!: string;
}
