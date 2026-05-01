import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/review/entity/review.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

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

  @Column({ default: true })
  status!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  category_id!: number;

  @ManyToOne(() => Category, (category) => category.lots)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => User, (user) => user.lots)
  user!: User;

  @OneToMany(() => Review, (review) => review.lot)
  reviews!: Review[];

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.lots)
  subcategory!: User;
}
