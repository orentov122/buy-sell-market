import {
  IsInt,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  text!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsInt()
  authorId!: number;

  @IsInt()
  targetUserId!: number;

  @IsInt()
  lotId!: number;
}
