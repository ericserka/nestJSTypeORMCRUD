import { PhotoTypes } from '../entities/photo.entity';

export class CreatePhotoDto {
  type?: PhotoTypes;
  userId?: number;
}
