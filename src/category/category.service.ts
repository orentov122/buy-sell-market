import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exits = await this.categoryRepository.findOne({
      where: { category_description: createCategoryDto.category_description },
    });
    if (exits) {
      throw new Error('Category already exists');
    }
    if (exits) {
      throw new Error('Category already exists');
    } else {
    const category = this.categoryRepository.create(createCategoryDto);
    console.log("Created new Category");
    return this.categoryRepository.save(category);
    }
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(category_id: number) {
    return this.categoryRepository.findOne({ where: { category_id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
