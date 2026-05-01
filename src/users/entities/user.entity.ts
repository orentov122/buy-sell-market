import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lots } from 'src/lots/entities/lots.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Review } from 'src/review/entity/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  balance!:number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => Lots, (lots) => lots.user)
  lots!: Lots[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Review, (review) => review.author)
  reviews_sent!: Review[];

  @OneToMany(() => Review, (review) => review.target_user)
  reviews_received!: Review[];
}
