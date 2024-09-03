
import { IsString, IsCurrency, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsString()
    Category: string;
}