import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Lots } from 'src/lots/entities/lots.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.subcategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @OneToMany(() => Lots, (lot) => lot.subcategory)
  lots!: Lots[];
}
