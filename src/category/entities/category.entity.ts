import { Lots } from 'src/lots/entities/lots.entiti';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id!: number;

  @Column()
  category_name!: string;

  @Column()
  category_description!: string;

  @OneToMany(() => Lots, (lot) => lot.category)
  lots!: Lots[];
}
