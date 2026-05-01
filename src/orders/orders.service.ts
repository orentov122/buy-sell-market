import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(dto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(dto);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new HttpException(
        'Ошибка при создании заказа',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return this.orderRepository.find({ relations: ['user', 'lot'] });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['user', 'lot'],
    });
    if (!order)
      throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
    return order;
  }

  async remove(id: number) {
    const result = await this.orderRepository.delete({ order_id: id });
    if (result.affected === 0)
      throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
    return { deleted: true };
  }

  private readonly transitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
    [OrderStatus.COMPLETED]: [OrderStatus.REFUNDED],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
  };

  async updateStatus(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
    });

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    if (dto.status) {
      const allowed = this.transitions[order.status];

      if (!allowed.includes(dto.status)) {
        throw new BadRequestException(
          `Transition from ${order.status} to ${dto.status} is not allowed`,
        );
      }
      order.status = dto.status;
    }

    if (dto.price) order.price = dto.price;
    if (dto.lot_id) order.lot_id = dto.lot_id;
    if (dto.user_id) order.user_id = dto.user_id;

    return await this.orderRepository.save(order);
  }
}
