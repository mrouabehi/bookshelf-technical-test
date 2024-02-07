import { IsNumber, IsOptional } from 'class-validator';

export class GetBooksQuery {
    @IsNumber()
    @IsOptional()
        take?: number;

    @IsNumber()
    @IsOptional()
        skip?: number;
}