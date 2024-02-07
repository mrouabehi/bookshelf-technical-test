import { Test } from '@nestjs/testing';
import { GetBookById } from './get-book-by-id.use-case';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';
import { faker } from '@faker-js/faker';

describe('Use Case: Get book by id', () => {
    let usecase: GetBookById;
    let repository: BooksRepository;
    let owner: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                GetBookById,
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                }
            ]
        }).compile();

        usecase = moduleRef.get<GetBookById>(GetBookById);
        repository = moduleRef.get<BooksRepository>(BooksRepository);
        owner = faker.string.uuid();
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when book does not exists', () => {
        it('should throw a BookNotFoundException', async () => {
            const params = {
                id: faker.string.uuid(),
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
        let bookId: string;

        beforeEach(async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            bookId = book.id;
        });

        it('should throw an UnauthorizedBookAccessException', async () => {
            try {
                await usecase.execute({
                    id: bookId,
                    owner: faker.string.uuid()
                });
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedBookAccessException);
            }
        });
    });

    describe('when book exists and user owns it', () => {
        let bookId: string;

        beforeEach(async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            bookId = book.id;
        });

        it('should throw an UnauthorizedBookAccessException', async () => {
            const book = await usecase.execute({
                id: bookId,
                owner
            });

            expect(book).toBeDefined();
        });
    });
});