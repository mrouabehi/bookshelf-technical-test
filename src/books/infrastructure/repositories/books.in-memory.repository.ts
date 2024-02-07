import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../../domain/repositories/books.repository';
import { Book } from '../../domain/entities';
import { BookAlreadyExistsException, BookNotFoundException } from '../../domain/exceptions';
import { faker } from '@faker-js/faker';

@Injectable()
export class InMemoryBooksRepository implements BooksRepository {
    books: Book[] = [];

    async create (params: { title: string; author: string; description?: string; owner: string; }): Promise<Book> {
        if (this.books.find(book => book.title === params.title && book.author === params.author && book.owner === params.owner)) {
            throw new BookAlreadyExistsException();
        }

        const book = Book.build({
            id: faker.string.uuid(),
            title: params.title,
            author: params.author,
            description: params.description,
            owner: params.owner
        });

        this.books.push(book);

        return book;
    }

    async findById (id: string): Promise<Book | undefined> {
        return this.books.find(book => book.id === id);
    }

    async findByTitleAndAuthor (title: string, author: string): Promise<Book | undefined> {
        return this.books.find(
            book => book.title === title && book.author === author
        );
    }

    async findMany (params: {
        owner: string;
        take?: number;
        skip?: number;
    }): Promise<Book[]> {
        let books = this.books.filter(book => book.owner === params.owner);

        if (params.skip) {
            books = books.slice(params.skip);
        }

        if (params.take) {
            books = books.slice(0, params.take);
        }

        return books;
    }

    async update (id: string, params: { title: string; author: string; description?: string; }): Promise<Book> {
        const bookIndex = this.books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            throw new BookNotFoundException();
        }

        this.books[bookIndex].title = params.title;
        this.books[bookIndex].author = params.author;
        this.books[bookIndex].description = params.description;

        return this.books[bookIndex];
    }

    async delete (id: string): Promise<Book> {
        const bookIndex = this.books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            throw new BookNotFoundException();
        }

        const book = this.books[bookIndex];

        this.books.splice(bookIndex, 1);

        return book;
    }
}