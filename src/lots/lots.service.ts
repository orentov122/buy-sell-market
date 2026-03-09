import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lots } from "./entities/lots.entiti";
import { Repository } from "typeorm";
import { CreateLotsDto } from "./dto/create-lots.dto";

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(Lots)
    private readonly lotsRepository: Repository<Lots>,
  ) {}

  async create(dto: CreateLotsDto): Promise<Lots> {
    const exits = await this.lotsRepository.findOne({
      where: { desc: dto.desc },
    });
    const detail = await this.lotsRepository.findOne({
      where: { detal_desc: dto.detal_desc },
    });
    if (exits) {
      throw new Error('Lot already exists');
    }
    if (detail) {
      throw new Error('Lot already exists');
    }
    if (!dto.desc) throw new Error('Description required');

    const lot = this.lotsRepository.create(dto);
    return await this.lotsRepository.save(lot);
  }

  async findAll() {
    return this.lotsRepository.find();
  }
  async findOne(id:number) {
    return this.lotsRepository.find({ where: { id } });
  }
  async remove(dto: CreateLotsDto, id: number): Promise<Lots> {
    const lot = await this.lotsRepository.findOne({ where: { id: id } });
    if (!lot) {
      throw new Error('Lot not found');
    }
    try {
      await this.lotsRepository.remove(lot);
      return lot;
    } catch (error) {
      throw new Error('Error removing lot');
    }
}
}