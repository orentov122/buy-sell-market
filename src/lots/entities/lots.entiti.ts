import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Lots {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  desc!: string;

  @Column()
  detal_desc!: string;

  @Column()
  price!: number;

  @Column()
  status!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  category_id!: number;

  @ManyToOne(() => Category, (category) => category.lots)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
