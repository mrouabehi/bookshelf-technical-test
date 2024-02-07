import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from '../../../../shared/guards/is-authenticated.guard';
import { SearchBookQuery } from './search-book.query';
import { GetBookById, GetBookByTitleAndAuthor } from '../../../application/use-cases';

@Controller()
export class SearchBookController {
    constructor (
        private readonly getBookById: GetBookById,
        private readonly getBookByTitleAndAuthor: GetBookByTitleAndAuthor
    ) {}

    @Get('books/search')
    @UseGuards(IsAuthenticatedGuard)
    public async controller (
        @Req() request,
        @Query() query: SearchBookQuery
    ) {
        const owner = request.user.id;

        if (query.title && query.author) {
            return this.getBookByTitleAndAuthor.execute({
                title: query.title,
                author: query.author,
                owner
            });
        }

        return this.getBookById.execute({
            id: query.id,
            owner
        });
    }
}