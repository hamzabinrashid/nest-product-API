import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsOptional, IsUUID, IsCurrency } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsCurrency()
    price: number;

    @IsString()
    description: string;

    @IsString()
    Category: string;
}