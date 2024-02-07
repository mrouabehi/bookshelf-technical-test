import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';

interface Parameters {
    id: string;
    owner: string;
}

@Injectable()
export class DeleteBook implements UseCase<Parameters, Book> {
    constructor (
        private readonly booksRepository: BooksRepository
    ) {}

    public async execute (params: Parameters): Promise<Book> {
        const book = await this.checkIfBookExists(params.id);

        await this.checkIfUserHasPermission(book, params.owner);

        return await this.booksRepository.delete(params.id);
    }

    private async checkIfBookExists (id: string): Promise<Book> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new BookNotFoundException();
        }

        return book;
    }

    private async checkIfUserHasPermission (book: Book, owner: string): Promise<void> {
        if (book.owner !== owner) {
            throw new UnauthorizedBookAccessException();
        }
    }
}