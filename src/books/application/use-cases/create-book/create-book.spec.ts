import { Test } from '@nestjs/testing';

import { CreateBook } from './create-book.use-case';
import { BookAlreadyExistsException } from '../../../domain/exceptions';

import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';

import { faker } from '@faker-js/faker';

describe('Use Case: Create Book', () => {
    let usecase: CreateBook;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CreateBook,
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                }
            ]
        }).compile();

        usecase = moduleRef.get<CreateBook>(CreateBook);
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when everything is ok', () => {
        let book;
        let params;

        beforeEach(async () => {
            params = {
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                description: 'A great book',
                owner: faker.string.uuid()
            };

            book = await usecase.execute(params);
        });

        it('should create a book', async () => {
            expect(book).toBeDefined();
        });

        it('should have the right title', () => {
            expect(book.title).toEqual(params.title);
        });

        it('should have the right author', () => {
            expect(book.author).toEqual(params.author);
        });

        it('should have the right description', () => {
            expect(book.description).toEqual(params.description);
        });

        it('should have a pending status', () => {
            expect(book.status).toEqual('pending');
        });
    });

    describe('when the book already exists', () => {
        it('should throw a BookAlreadyExistsException', async () => {
            const params = {
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                description: 'A great book',
                owner: faker.string.uuid()
            };

            await usecase.execute(params);

            try {
                await usecase.execute(params);
            } catch (error) {
                expect(error).toBeInstanceOf(BookAlreadyExistsException);
            }
        });
    });
});
