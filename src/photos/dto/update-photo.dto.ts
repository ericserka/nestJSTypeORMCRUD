import { PartialType } from '@nestjs/mapped-types';
import { PhotoTypes } from '../entities/photo.entity';
import { CreatePhotoDto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  type: PhotoTypes;
  userId: number;
}
