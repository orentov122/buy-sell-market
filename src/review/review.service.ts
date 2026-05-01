import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { Not, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/review-create.dto';
import { UpdateReviewDto } from './dto/review-update.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
  async create(dto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      text: dto.text,
      rating: dto.rating,
      author: { id: dto.authorId } as any,
      target_user: { id: dto.targetUserId } as any,
      lot: { id: dto.lotId } as any,
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    } else {
      console.log("Created Review")
    }
    return this.reviewRepository.save(review);
  }
  async remove(id: number) {
    const exists = await this.reviewRepository.findOneBy({ id });

    if (!exists) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.reviewRepository.remove(exists);
  }
  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.findOne(id);

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const { text, rating } = dto;

    this.reviewRepository.merge(review, { text, rating });

    return this.reviewRepository.save(review);
  }
  async findAll(limit: number = 10, offset: number = 0) {
    const reviews = await this.reviewRepository.find({
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' },
      relations: ['author', 'target_user', 'lot'],
    });
    if (reviews) {
      return reviews;
    } else {
      throw new NotFoundException('Reviews not found');
    }
  }
  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['author', 'target_user', 'lot'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }
  async findRating(rating: number) {
    const reviews = await this.reviewRepository.findOneBy({ rating });

    if (reviews) {
      return reviews;
    } else {
      throw new NotFoundException(`Review with rating ${rating} not found`);
    }
  }
  async findByRatingUser(rating: number, id: number) {
    const reviews = await this.reviewRepository.find({
      where: {
        rating: Not(rating),
        target_user: { id },
      },
      relations: ['author', 'target_user', 'lot'],
    });
    if (reviews) {
      return reviews;
    } else {
      throw new NotFoundException(`Reviews with rating ${rating} not found`);
    }
  }
}