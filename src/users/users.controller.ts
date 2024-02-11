import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserEntity } from './entities/user.entity';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() userData: SignupUserDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(userData) };
  }

  @Post('signin')
  async signin(@Body() userData: SigninUserDto): Promise<{
    token: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(userData);
    const token = this.usersService.getAccessToken(user);

    return { token, user };
  }

  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }
}
