import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  private readonly photosRepository: Repository<Photo>;
  private readonly usersRepository: Repository<User>;

  constructor(connection: Connection) {
    this.photosRepository = connection.getRepository(Photo);
    this.usersRepository = connection.getRepository(User);
  }

  async create(createPhotoDto: CreatePhotoDto): Promise<void | Error> {
    if (!(await this.usersRepository.findOne(createPhotoDto.userId))) {
      return new Error('User not found');
    }
    await this.photosRepository.save(
      this.photosRepository.create(createPhotoDto)
    );
  }

  async findAll(): Promise<Photo[]> {
    return await this.photosRepository.find({
      order: { created_at: 'DESC' },
      select: ['type'],
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Photo | Error> {
    const photo = await this.photosRepository.findOne(id, {
      select: ['type'],
      relations: ['user'],
    });
    if (!photo) {
      return new Error('Photo not found');
    }
    return photo;
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto
  ): Promise<void | Error> {
    const photo = await this.photosRepository.findOne(id);
    if (!photo) {
      return new Error('Photo not found');
    } else if (!(await this.usersRepository.findOne(updatePhotoDto.userId))) {
      return new Error('User not found');
    }
    photo.type = updatePhotoDto.type;
    photo.userId = updatePhotoDto.userId;
    await this.photosRepository.save(photo);
  }

  async remove(id: number): Promise<void | Error> {
    if (!(await this.photosRepository.findOne(id))) {
      return new Error('Photo not found');
    }
    await this.photosRepository.delete(id);
  }
}
