import { Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common';
import { EditBook } from '../../../application/use-cases';
import { EditBookDto } from './edit-book.dto';
import { IsAuthenticatedGuard } from '../../../../shared/guards/is-authenticated.guard';

@Controller()
export class EditBookController {
    constructor (
        private readonly editBook: EditBook
    ) {}

    @Put('books/:id')
    @UseGuards(IsAuthenticatedGuard)
    public async controller (
        @Req() request,
        @Param('id') id: string,
        @Body() body: EditBookDto
    ) {
        return await this.editBook.execute({
            id,
            title: body.title,
            author: body.author,
            description: body.description,
            owner: request.user.id
        });
    }
}