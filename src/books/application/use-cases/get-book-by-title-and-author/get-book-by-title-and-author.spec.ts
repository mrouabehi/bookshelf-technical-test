import { Test } from '@nestjs/testing';
import { GetBookByTitleAndAuthor } from './get-book-by-title-and-author.use-case';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';
import { faker } from '@faker-js/faker';

describe('Use Case: Get book by title and author', () => {
    let usecase: GetBookByTitleAndAuthor;
    let repository: BooksRepository;
    let owner: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                GetBookByTitleAndAuthor,
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                }
            ]
        }).compile();

        usecase = moduleRef.get<GetBookByTitleAndAuthor>(GetBookByTitleAndAuthor);
        repository = moduleRef.get<BooksRepository>(BooksRepository);
        owner = faker.string.uuid();
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when book does not exists', () => {
        it('should throw a BookNotFoundException', async () => {
            const params = {
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
        let bookTitle: string;
        let bookAuthor: string;

        beforeEach(async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            bookTitle = book.title;
            bookAuthor = book.author;
        });

        it('should throw an UnauthorizedBookAccessException', async () => {
            try {
                await usecase.execute({
                    title: bookTitle,
                    author: bookAuthor,
                    owner: faker.string.uuid()
                });
            } catch (error) {
                expect(error).toBeInstanceOf(UnauthorizedBookAccessException);
            }
        });
    });

    describe('when book exists and user owns it', () => {
        let bookTitle: string;
        let bookAuthor: string;

        beforeEach(async () => {
            const book = await repository.create({
                title: faker.lorem.words(3),
                author: `${faker.person.firstName()} ${faker.person.lastName()}`,
                owner
            });

            bookTitle = book.title;
            bookAuthor = book.author;
        });

        it('should throw an UnauthorizedBookAccessException', async () => {
            const book = await usecase.execute({
                title: bookTitle,
                author: bookAuthor,
                owner
            });

            expect(book).toBeDefined();
        });
    });
});