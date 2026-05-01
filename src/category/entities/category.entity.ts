import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Lots } from 'src/lots/entities/lots.entity';
import { Order } from 'src/orders/entities/orders.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  category_name!: string;

  @Column({ length: 1000 })
  category_description!: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories!: Subcategory[];

  @OneToMany(() => Lots, (lot) => lot.category)
  lots!: Lots[];

  @OneToMany(() => Order, (order) => order.category)
  orders!: Order[];
}
