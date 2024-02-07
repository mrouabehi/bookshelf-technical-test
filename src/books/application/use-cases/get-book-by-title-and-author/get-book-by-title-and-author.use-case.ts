import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';

interface Parameters {
    title: string;
    author: string;
    owner: string;
}

@Injectable()
export class GetBookByTitleAndAuthor implements UseCase<Parameters, Book> {
    constructor (
        private readonly repository: BooksRepository
    ) {}

    public async execute (params: Parameters): Promise<Book> {
        const book = await this.checkThatBookExists(params.title, params.author);

        await this.checkThatUserOwnsTheBook(book, params.owner);

        return book;
    }

    private async checkThatBookExists (title: string, author: string): Promise<Book> {
        const book = await this.repository.findByTitleAndAuthor(title, author);

        if (!book) {
            throw new BookNotFoundException();
        }

        return book;
    }

    private async checkThatUserOwnsTheBook (book: Book, owner: string): Promise<void> {
        if (book.owner !== owner) {
            throw new UnauthorizedBookAccessException();
        }
    }
}