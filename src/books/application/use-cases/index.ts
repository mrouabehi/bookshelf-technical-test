import { CreateBook } from './create-book/create-book.use-case';
import { GetBookById } from './get-book-by-id/get-book-by-id.use-case';
import { GetBookByTitleAndAuthor } from './get-book-by-title-and-author/get-book-by-title-and-author.use-case';
import { GetBooks } from './get-books/get-books.use-case';
import { EditBook } from './edit-book/edit-book.use-case';
import { DeleteBook } from './delete-book/delete-book.use-case';

export const booksUseCases = [
    CreateBook,
    GetBooks,
    GetBookById,
    GetBookByTitleAndAuthor,
    EditBook,
    DeleteBook
];

export {
    CreateBook,
    GetBooks,
    GetBookById,
    GetBookByTitleAndAuthor,
    EditBook,
    DeleteBook
};