import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lots } from 'src/lots/entities/lots.entity';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @ManyToOne(() => Category, (category) => category.orders)
  category!: Category;

  @ManyToOne(() => Subcategory)
  subcategory!: Subcategory;

  @Column()
  lot_id!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column()
  price!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Lots, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lot_id' })
  lot!: Lots;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
