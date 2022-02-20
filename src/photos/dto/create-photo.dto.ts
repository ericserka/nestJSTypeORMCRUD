import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { PhotoTypes } from '../entities/photo.entity';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsEnum(PhotoTypes)
  type: PhotoTypes;

  @IsNotEmpty()
  @IsObject()
  user: User;
}
