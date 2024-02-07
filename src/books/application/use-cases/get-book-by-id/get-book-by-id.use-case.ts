import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';
import { BooksRepository } from '../../../domain/repositories/books.repository';

interface Parameters {
    id: string;
    owner: string;
}

@Injectable()
export class GetBookById implements UseCase<Parameters, Book> {
    constructor (
        private readonly repository: BooksRepository
    ) {}

    public async execute (params: Parameters): Promise<Book> {
        const book = await this.checkThatBookExists(params.id);

        await this.checkThatUserOwnsTheBook(book, params.owner);

        return book;
    }

    private async checkThatBookExists (id: string): Promise<Book> {
        const book = await this.repository.findById(id);

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