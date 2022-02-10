import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PhotoTypes } from '../entities/photo.entity';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsEnum(PhotoTypes)
  type: PhotoTypes;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
