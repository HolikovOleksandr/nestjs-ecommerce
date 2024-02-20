import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserEntity } from './entities/user.entity';
import { SigninUserDto } from './dto/signin-user.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AutorizeRoles } from 'src/utility/decorators/autorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() userData: SignupUserDto): Promise<{ user: UserEntity }> {
    const token = this.usersService.getAccessToken(userData as UserEntity);
    console.log(token);

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

  @AutorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthenticationGuard)
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() currentUser: UserEntity): UserEntity {
    return currentUser;
  }
}
