import { Test } from '@nestjs/testing';
import { GetBooks } from './get-books.use-case';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';
import { faker } from '@faker-js/faker';

describe('Use Case: Get user books', () => {
    let usecase: GetBooks;
    let repository: BooksRepository;
    let owner: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                },
                GetBooks,
            ]
        }).compile();

        usecase = moduleRef.get<GetBooks>(GetBooks);
        repository = moduleRef.get<BooksRepository>(BooksRepository);
        owner = faker.string.uuid();
    });

    beforeEach(async () => {
        for (let i = 0; i < 10; i++) {
            await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner,
            });
        }
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when no skip and take are provided', () => {
        it('should return all books', async () => {
            const books = await usecase.execute({ owner });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(10);
        });
    });

    describe('when skip is provided', () => {
        it('should return all books starting from skip index -- Case Skip = 2', async () => {
            const books = await usecase.execute({ owner, skip: 2 });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(8);
        });

        it('should return all books starting from skip index -- Case Skip = 7', async () => {
            const books = await usecase.execute({ owner, skip: 7 });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(3);
        });
    });

    describe('when take is provided', () => {
        it('should return X books -- Case Take = 2', async () => {
            const books = await usecase.execute({ owner, take: 2 });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(2);
        });

        it('should return X books -- Case Take = 7', async () => {
            const books = await usecase.execute({ owner, take: 7 });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(7);
        });

        it('should return X books -- Case Take = 7 and Skip = 5', async () => {
            const books = await usecase.execute({ owner, take: 7, skip: 5 });

            expect(books).not.toBeNull();
            expect(books).toHaveLength(5);
        });
    });
});