import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupUserDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name can not be an empty' })
  name: string;

  @IsNotEmpty({ message: 'Name can not be an empty' })
  @IsEmail({}, { message: 'Please, provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be an empty' })
  @MinLength(5, { message: 'Password cannot be lesser than 5 characters' })
  @MaxLength(16, { message: 'Password cannot be longest than 16 characters' })
  password: string;
}
