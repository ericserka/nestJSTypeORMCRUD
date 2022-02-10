import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// classe com todas as propriedades da classe de criacao, só que aqui todas as propriedades se tornam opcionais
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
