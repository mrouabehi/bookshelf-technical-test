import { Test } from '@nestjs/testing';
import { DeleteBook } from './delete-book.use-case';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { InMemoryBooksRepository } from '../../../infrastructure/repositories';
import { BookNotFoundException, UnauthorizedBookAccessException } from '../../../domain/exceptions';
import { faker } from '@faker-js/faker';

describe('Use Case: Delete book', () => {
    let usecase: DeleteBook;
    let repository: BooksRepository;
    let owner: string;
    let bookId: string;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: BooksRepository,
                    useClass: InMemoryBooksRepository
                },
                DeleteBook
            ]
        }).compile();

        usecase = moduleRef.get<DeleteBook>(DeleteBook);
        repository = moduleRef.get<BooksRepository>(BooksRepository);
        owner = faker.string.uuid();
    });

    beforeEach(async () => {
        const book = await repository.create({
            title: faker.lorem.words(3),
            author: `${faker.person.firstName()} ${faker.person.lastName()}`,
            owner
        });

        bookId = book.id;
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    describe('when the book does not exists', () => {
        it('should throw an BookNotFoundException', async () => {
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

    describe('when everything is ok', () => {
        it('should remove the book', async () => {
            await usecase.execute({
                id: bookId,
                owner
            });

            const book = await repository.findById(bookId);

            expect(book).toBeUndefined();
        });
    });
});