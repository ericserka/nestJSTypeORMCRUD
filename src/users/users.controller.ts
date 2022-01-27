import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    // + converte string para number
    const result = await this.usersService.findOne(+id);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.json(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    // + converte string para number
    const result = await this.usersService.update(+id, updateUserDto);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.status(204).end();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    // + converte string para number
    const result = await this.usersService.remove(+id);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.status(204).end();
  }
}