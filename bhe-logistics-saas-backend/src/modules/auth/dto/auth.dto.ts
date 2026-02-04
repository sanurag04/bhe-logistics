import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  IsUUID,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsOptional()
  @IsUUID()
  franchiseId?: string;
}

export class RegisterFranchiseUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  name!: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsUUID()
  franchiseId!: string;
}
