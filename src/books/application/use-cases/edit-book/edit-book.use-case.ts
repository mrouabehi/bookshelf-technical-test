import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import {
    BookAlreadyExistsException,
    BookNotFoundException,
    UnauthorizedBookAccessException
} from '../../../domain/exceptions';

interface Parameters {
    id: string;
    title: string;
    author: string;
    description?: string;
    owner: string;
}

@Injectable()
export class EditBook implements UseCase<Parameters, Book> {
    constructor (
        private readonly booksRepository: BooksRepository
    ) {}

    public async execute (params: Parameters): Promise<Book> {
        const book = await this.checkIfBookExists(params.id);

        await this.checkIfUserHasPermission(book, params.owner);

        await this.checkThatNewTitleAndAuthorDoesNotAlreadyExist(params.title, params.author, params.owner);

        return await this.booksRepository.update(params.id, {
            title: params.title,
            author: params.author,
            description: params.description
        });
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

    private async checkThatNewTitleAndAuthorDoesNotAlreadyExist (title: string, author: string, owner: string): Promise<void> {
        const book = await this.booksRepository.findByTitleAndAuthor(title, author);

        if (book && book.owner === owner) {
            throw new BookAlreadyExistsException();
        }
    }
}