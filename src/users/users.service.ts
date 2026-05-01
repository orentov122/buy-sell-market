import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: RegisterDto) {
    const exists = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    const users = this.usersRepository.find();
    if (users) {
      return users;
    } else {
      throw new NotFoundException('Not Found users');
    }
  }
  findOne(id: number) {
    const user = this.usersRepository.findOne({ where: { id } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('NotFound user id {$id}');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.usersRepository.merge(user, dto);

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.remove(user);
  }
}
