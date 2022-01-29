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
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Response } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  async create(
    @Body() createPhotoDto: CreatePhotoDto,
    @Res() response: Response
  ) {
    const result = await this.photosService.create(createPhotoDto);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.status(201).end();
  }

  @Get()
  async findAll() {
    return await this.photosService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this.photosService.findOne(id);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.json(result);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
    @Res() response: Response
  ) {
    const result = await this.photosService.update(id, updatePhotoDto);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.status(204).end();
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this.photosService.remove(id);
    if (result instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return response.status(204).end();
  }
}
