import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './review-create.dto';


export class UpdateReviewDto extends PartialType(CreateReviewDto) {}

