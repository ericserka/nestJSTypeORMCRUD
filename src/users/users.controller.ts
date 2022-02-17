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
  ParseIntPipe,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { TransactionDTO } from './dto/transaction.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('transaction_test')
  @HttpCode(201)
  async transaction_test(@Body() transactionDTO: TransactionDTO) {
    return await this.usersService.transaction_test(transactionDTO);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this.usersService.findOne(id);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return response.json(result);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response
  ) {
    const result = await this.usersService.update(id, updateUserDto);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return response.status(204).end();
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this.usersService.remove(id);
    if (result instanceof Error) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return response.status(204).end();
  }
}
