import { Roles } from 'src/utility/user-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.USER] })
  role: Roles[];
}
