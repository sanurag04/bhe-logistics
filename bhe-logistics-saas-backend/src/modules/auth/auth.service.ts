import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';
import {
  LoginDto,
  CreateUserDto,
  RegisterFranchiseUserDto,
} from './dto/auth.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { BusinessException } from '../../common/exceptions/business.exceptions';
import { Franchise } from '../../franchise/franchise.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['franchise'],
        select: [
          'id',
          'email',
          'password_hash',
          'role',
          'franchiseId',
          'createdAt',
          'updatedAt',
        ],
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!(await bcrypt.compare(password, user.password_hash))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password_hash, ...result } = user;
      return result;
    } catch (error) {
      // Re-throw specific exceptions without wrapping
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Log unexpected errors for debugging
      console.error('Unexpected error during user validation:', error);

      // Wrap unexpected errors in BusinessException
      throw new BusinessException('Authentication failed');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = {
        sub: user.id,
        role: user.role,
        franchiseId: user.franchiseId,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      // Re-throw specific exceptions without wrapping
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Log unexpected errors for debugging
      console.error('Unexpected error during login:', error);

      // Wrap unexpected errors in BusinessException
      throw new BusinessException('Login failed');
    }
  }

  async createUser(
    createUserDto: CreateUserDto,
    creatorRole: UserRole,
    creatorFranchiseId: string,
  ) {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Enforce franchise isolation
      let franchiseId: string;
      if (creatorRole === UserRole.SUPER_ADMIN) {
        // SUPER_ADMIN can assign users to any franchise or use their own
        franchiseId = createUserDto.franchiseId || creatorFranchiseId;
      } else {
        // FRANCHISE_ADMIN and other roles can only create users in their own franchise
        // Override any provided franchiseId with the creator's franchise
        franchiseId = creatorFranchiseId;

        // If a franchiseId was provided by a non-SUPER_ADMIN, it will be ignored
        if (
          createUserDto.franchiseId &&
          createUserDto.franchiseId !== creatorFranchiseId
        ) {
          // Log that franchiseId was overridden for security
          console.warn(
            `Non-SUPER_ADMIN user attempted to create user in different franchise. Overriding with creator's franchise.`,
          );
        }
      }

      // Create user
      const user = this.userRepository.create({
        email: createUserDto.email,
        password_hash: hashedPassword,
        role: createUserDto.role || UserRole.EMPLOYEE,
        franchiseId: franchiseId,
      });

      // Save user
      const savedUser = await this.userRepository.save(user);
      const { password_hash, ...result } = savedUser;
      return result;
    } catch (error) {
      // Re-throw specific exceptions without wrapping
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      // Log unexpected errors for debugging
      console.error('Unexpected error during user creation:', error);

      // Wrap unexpected errors in BusinessException
      throw new BusinessException('User creation failed');
    }
  }

  async registerFranchiseUser(registerDto: RegisterFranchiseUserDto) {
    try {
      // Check if franchise exists
      const franchise = await this.franchiseRepository.findOne({
        where: { id: registerDto.franchiseId },
      });

      if (!franchise) {
        throw new NotFoundException('Franchise not found');
      }

      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create user
      const user = this.userRepository.create({
        email: registerDto.email,
        password_hash: hashedPassword,
        role: registerDto.role || UserRole.EMPLOYEE,
        franchiseId: registerDto.franchiseId,
      });

      // Save user
      const savedUser = await this.userRepository.save(user);
      const { password_hash, ...result } = savedUser;

      // Generate JWT token
      const payload: JwtPayload = {
        sub: savedUser.id,
        role: savedUser.role,
        franchiseId: savedUser.franchiseId || '',
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    } catch (error) {
      // Re-throw specific exceptions without wrapping
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Log unexpected errors for debugging
      console.error('Unexpected error during registration:', error);

      // Wrap unexpected errors in BusinessException
      throw new BusinessException('Registration failed');
    }
  }
}
