import { BooksRepository } from '../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from './books.in-memory.repository';

export const booksRepositories = [
    {
        provide: BooksRepository,
        useClass: InMemoryBooksRepository
    }
];

export {
    InMemoryBooksRepository
};