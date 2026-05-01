import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}
  
  @Post("create")
  async create(@Body() dto:CreateOrderDto) {
   return await this.orderService.create(dto);
  }
  @Put('/status/update/:id') 
  async updateStatus(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return await this.orderService.updateStatus(id, dto);
  }
  @Get("id")
   async findOne(@Param('id') id: number) {
    return await this.orderService.findOne(id);
   }
   @Get("all")
   async findAll() {
    return await this.orderService.findAll();
   }
   @Delete('remove/:id')
   async remove(@Param('id') id: number) {
    return await this.orderService.remove(id);
   }
}