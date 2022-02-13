import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PhotoTypes } from 'src/photos/entities/photo.entity';

export class TransactionDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsEnum(PhotoTypes)
  type: PhotoTypes;
}
