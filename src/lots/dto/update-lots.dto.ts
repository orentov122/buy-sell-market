import { PartialType } from '@nestjs/mapped-types';
import { CreateLotsDto } from './create-lots.dto';

export class UpdateLotsDto extends PartialType(CreateLotsDto) {}

// Комменатрий для самого себя тут игнорируется конфликт класс валидатора и пакета 
// Если будут ошибки иди сюда