import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
    @MaxLength(100, { message: 'Book title must be at most 100 characters long' })
    @MinLength(3, { message: 'Book title must be at least 3 characters long' })
    @IsString({ message: 'Book title must be a string' })
    @IsNotEmpty({ message: 'Book title is required' })
        title: string;

    @MaxLength(100, { message: 'Book author must be at most 100 characters long' })
    @MinLength(2, { message: 'Book author must be at least 2 characters long' })
    @IsString({ message: 'Book author must be a string' })
    @IsNotEmpty({ message: 'Book author is required' })
        author: string;

    @MaxLength(100, { message: 'Book name must be at most 100 characters long' })
    @MinLength(3, { message: 'Book name must be at least 3 characters long' })
    @IsString({ message: 'Book description must be a string' })
    @IsOptional()
        description?: string;
}