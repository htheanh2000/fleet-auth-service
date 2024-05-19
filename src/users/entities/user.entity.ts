import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: true})
  email: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  providerId: string; // ID provided by the OAuth provider

  @Column({ nullable: true })
  provider: string; // Name of the OAuth provider ('facebook', 'google', etc.)

  @Column({ nullable: true })
  firstname: string; 

  @Column({ nullable: true })
  lastname: string; 
}
