import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  @HttpCode(201)
  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstName', 'lastName', 'isActive'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User | Error> {
    const user = await this.usersRepository.findOne(id, {
      select: ['firstName', 'lastName', 'isActive'],
    });
    if (!user) {
      return new Error('User not found');
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<void | Error> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return new Error('User not found');
    }
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.isActive = updateUserDto.isActive;
    await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void | Error> {
    if (!(await this.usersRepository.findOne(id))) {
      return new Error('User not found');
    }
    await this.usersRepository.delete(id);
  }
}
