import { Book } from '../entities';
import { BookAuthor, BookId, BookTitle } from '../entities/book.entity';

export abstract class BooksRepository {
    abstract create (params: {
        title: string;
        author: string;
        description?: string;
        owner: string;
    }): Promise<Book>;
    abstract findById (id: BookId): Promise<Book | undefined>;
    abstract findByTitleAndAuthor (title: BookTitle, author: BookAuthor): Promise<Book | undefined>;
    abstract findMany (params: {
        owner: string;
        take?: number;
        skip?: number;
    }): Promise<Book[] | undefined>;
    abstract update (id: BookId, params: {
        title: string;
        author: string;
        description?: string;
    }): Promise<Book>;
    abstract delete (id: BookId): Promise<Book>;
}