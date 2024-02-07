import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../shared/interfaces/use-case.interface';
import { Book } from '../../../domain/entities';
import { BooksRepository } from '../../../domain/repositories/books.repository';

interface Parameters {
    owner: string;
    take?: number;
    skip?: number;
}

@Injectable()
export class GetBooks implements UseCase<Parameters, Book[] | null> {
    constructor (
        private readonly booksRepository: BooksRepository
    ) {}

    public execute (params: Parameters): Promise<Book[]> {
        return this.booksRepository.findMany({
            owner: params.owner,
            take: params.take,
            skip: params.skip
        });
    }
}