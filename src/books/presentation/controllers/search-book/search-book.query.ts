import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class SearchBookQuery {
    @IsUUID(undefined, { message: 'Book idd must be a valid UUID' })
    @IsNotEmpty({ message: 'Book id is required' })
    @ValidateIf((object, value) => value !== undefined, {
        message: 'Id is required if title or author is not provided',
    })
        id?: string;


    @MaxLength(100, { message: 'Book title must be at most 100 characters long' })
    @MinLength(3, { message: 'Book title must be at least 3 characters long' })
    @IsString({ message: 'Book title must be a string' })
    @IsNotEmpty({ message: 'Book title is required' })
    @ValidateIf((object) => object.id === undefined, {
        message: 'Title is required when id is empty',
    })
        title?: string;


    @MaxLength(100, { message: 'Book author must be at most 100 characters long' })
    @MinLength(2, { message: 'Book author must be at least 2 characters long' })
    @IsString({ message: 'Book author must be a string' })
    @IsNotEmpty({ message: 'Book author is required' })
    @ValidateIf((object) => object.id === undefined, {
        message: 'Author is required when id is empty',
    })
        author?: string;
}