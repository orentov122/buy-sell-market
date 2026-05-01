import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { ILike } from 'typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto, id: number) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: {
        name: createSubcategoryDto.name,
        category: { id },
      },
    });
    if (subcategory) {
      throw new BadRequestException('Subcategory already exists');
    }

    const result = await this.subcategoryRepository.save(createSubcategoryDto);
    return result;
  }

  async findAll() {
    const subcategories = await this.subcategoryRepository.find();

    if (subcategories) {
      return subcategories;
    } else {
      throw new NotFoundException('Subcategories not found');
    }
  }
  async findAllByCategoryId(categoryId: number) {
    return await this.subcategoryRepository.find({
      where: { category: { id: categoryId } },
      order: { name: 'ASC' },
    });
  }
  async findOneWithDetails(id: number) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
      relations: ['lots', 'category'], 
    });

    if (!subcategory) throw new NotFoundException('Subcategory not found');
    return subcategory;
  }

  async findOne(id: number) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id },
    });
    if (subcategory) {
      return subcategory;
    } else {
      throw new NotFoundException('Subcategory not found');
    }
  }
  async findByName(name: string) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { name: name },
    });
    if (subcategory) {
      return subcategory;
    } else {
      throw new NotFoundException('Subcategory not found');
    }
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    const subcategory = await this.findOne(id);

    return this.subcategoryRepository.save({
      ...subcategory,
      ...updateSubcategoryDto,
    });
  }

  async remove(id: number) {
    const remove = await this.findOne(id);
    if (remove) {
      return this.subcategoryRepository.delete(id);
    } else {
      throw new NotFoundException('Subcategory not found');
    }
  }
  async countAll() {
    return await this.subcategoryRepository.count();
  }

async searchByName(term: string) {
  return await this.subcategoryRepository.find({
    where: { name: ILike(`%${term}%`) }, 
    take: 10, 
  });
}
}
