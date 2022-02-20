import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsObject } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { PhotoTypes } from '../entities/photo.entity';
import { CreatePhotoDto } from './create-photo.dto';

// classe com todas as propriedades da classe de criacao, só que aqui todas as propriedades se tornam opcionais
export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @IsEnum(PhotoTypes)
  type: PhotoTypes;

  @IsObject()
  user: User;
}
