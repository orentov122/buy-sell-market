import { Controller, Post, Body, Get } from '@nestjs/common';
import { LotsService } from './lots.service';
import { CreateLotsDto } from './dto/create-lots.dto';

@Controller("lots")
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  async createLot(@Body() dto: CreateLotsDto) {
    return this.lotsService.create(dto);
  }
@Get()
  async getAllLots() {
    return this.lotsService.findAll();
  }
}
