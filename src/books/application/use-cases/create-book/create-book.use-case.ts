import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { BookAlreadyExistsException } from '../../../domain/exceptions';

interface Parameters {
    title: string;
    author: string;
    description?: string;
    owner: string;
}

@Injectable()
export class CreateBook implements UseCase<Parameters, Book> {
    constructor (
        private readonly repository: BooksRepository
    ) {}

    public async execute (params: Parameters): Promise<Book> {
        await this.checkBookDoesNotExist(
            params.title,
            params.author,
            params.owner
        );

        return await this.createBook(params);
    }

    private async checkBookDoesNotExist (title: string, author: string, owner: string): Promise<void> {
        const book = await this.repository.findByTitleAndAuthor(title, author);

        if (book && book.owner === owner) {
            throw new BookAlreadyExistsException();
        }
    }

    private async createBook (params: Parameters): Promise<Book> {
        return this.repository.create(params);
    }
}