import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(userData: SignupUserDto): Promise<UserEntity> {
    const email = { email: userData.email };
    let existUser = await this.userRepository.findOneBy(email);
    if (existUser) throw new BadRequestException('Email already exist');

    userData.password = await hash(userData.password, 10);
    let user = this.userRepository.create(userData);
    user = await this.userRepository.save(user);

    delete user.password;
    return user;
  }

  async signin(userData: SigninUserDto): Promise<UserEntity> {
    const existUser = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userData.email })
      .getOne();
    if (!existUser) throw new BadRequestException('Invalid email');

    const passwordMatch = await compare(userData.password, existUser.password);
    if (!passwordMatch) throw new BadRequestException('Invalid password');

    delete existUser.password;
    return existUser;
  }

  getAccessToken(user: UserEntity): string {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
}
