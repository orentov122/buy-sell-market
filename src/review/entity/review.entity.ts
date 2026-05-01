import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lots } from 'src/lots/entities/lots.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  text!: string;

  @Column()
  rating!: number;

  @ManyToOne(() => User, (user) => user.reviews_sent)
  author!: User;

  @ManyToOne(() => User, (user) => user.reviews_received)
  target_user!: User;

  @ManyToOne(() => Lots, (lot) => lot.reviews)
  lot!: Lots;

  @CreateDateColumn()
  created_at!: Date;
  
  @UpdateDateColumn()
  updated_at!: Date;
}
