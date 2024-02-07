import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from '../../../../shared/guards/is-authenticated.guard';
import { GetBooks } from '../../../application/use-cases';
import { GetBooksQuery } from './get-books.query';

@Controller()
export class GetBooksController {
    constructor (private readonly getBooks: GetBooks) {}

    @Get('books')
    @UseGuards(IsAuthenticatedGuard)
    public async controller (
        @Req() request,
        @Query() query?: GetBooksQuery
    ) {
        const books = await this.getBooks.execute({ ...query, owner: request.user.id });

        return {
            books
        };
    }
}