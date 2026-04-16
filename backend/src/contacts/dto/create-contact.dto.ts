import { IsString, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  group?: string;
}