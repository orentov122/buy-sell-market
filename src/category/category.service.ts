import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.categoryRepository.findOne({
      where: { category_description: createCategoryDto.category_description },
    });
    if (exists) {
      throw new BadRequestException('Category already exists');
    }

    const category = this.categoryRepository.create({ ...createCategoryDto });
    console.log('Created new Category');
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    if (!categories) throw new NotFoundException('No categories found');
    return categories;
  }

  async findOne(category_id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: category_id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
  async findCategoryWithSubcategories(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['subcategories'],
    });

    if (!category) throw new NotFoundException('Category not found');

    return category.subcategories;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.categoryRepository.remove(category);
  }
  async countAll() {
    return await this.categoryRepository.count();
  }
  async searchByName(term: string) {
    return await this.categoryRepository.find({
      where: { category_name: ILike(`%${term}%`) }, 
      take: 10, 
    });
  }
}
