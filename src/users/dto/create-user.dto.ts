import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsBoolean()
  isActive: boolean;
}
