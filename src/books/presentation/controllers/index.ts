import { CreateBookController } from './create-book/create-book.controller';
import { GetBooksController } from './get-books/get-books.controller';
import { SearchBookController } from './search-book/search-book.controller';
import { EditBookController } from './edit-book/edit-book.controller';
import { DeleteBookController } from './delete-book/delete-book.controller';

export const booksControllers = [
    CreateBookController,
    GetBooksController,
    SearchBookController,
    EditBookController,
    DeleteBookController
];
