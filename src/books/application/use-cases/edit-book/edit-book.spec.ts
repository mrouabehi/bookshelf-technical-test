import { Test } from '@nestjs/testing';
import { EditBook } from './edit-book.use-case';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';
import {
    BookAlreadyExistsException,
    BookNotFoundException,
    UnauthorizedBookAccessException
} from '../../../domain/exceptions';
import { faker } from '@faker-js/faker';

describe('Use Case: Edit a book', () => {
    let usecase: EditBook;
    let repository: BooksRepository;
    let owner: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                },
                EditBook
            ]
        }).compile();

        usecase = moduleRef.get<EditBook>(EditBook);
        repository = moduleRef.get<BooksRepository>(BooksRepository);
        owner = faker.string.uuid();
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when the book does not exists', () => {
        it('should throw an BookNotFoundException', async () => {
            const params = {
                id: faker.string.uuid(),
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            };

            try {
                await usecase.execute(params);
            } catch (error) {
                expect(error).toBeInstanceOf(BookNotFoundException);
            }
        });
    });

    describe('when user does not own the book', () => {
        it('should throw an UnauthorizedBookAccessException', async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            try {
                await usecase.execute({
                    id: book.id,
                    title: faker.lorem.words(3),
                    author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                    owner: faker.string.uuid()
                });
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedBookAccessException);
            }
        });
    });

    describe('when the new title and author already exists', () => {
        it('should throw an BookAlreadyExistsException', async () => {
            const firstBook = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            const secondBook = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            try {
                await usecase.execute({
                    id: firstBook.id,
                    title: secondBook.title,
                    author: secondBook.author,
                    owner
                });
            } catch (error) {
                expect(error).toBeInstanceOf(BookAlreadyExistsException);
            }
        });
    });

    describe('when everything is ok', () => {
        it('should return the same book with edited value', async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            const bookClone = Object.assign({}, book);

            const editedBook = await usecase.execute({
                id: book.id,
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            expect(editedBook).toBeDefined();
            expect(editedBook.id).not.toEqual(bookClone.id);
            expect(editedBook.title).not.toEqual(bookClone.title);
            expect(editedBook.author).not.toEqual(bookClone.author);
        });
    });
});