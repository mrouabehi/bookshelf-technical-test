import { Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from '../../../../shared/guards/is-authenticated.guard';
import { DeleteBook } from '../../../application/use-cases';

@Controller()
export class DeleteBookController {
    constructor (
        private readonly deleteBook: DeleteBook
    ) {}

    @Delete('books/:id')
    @UseGuards(IsAuthenticatedGuard)
    public async controller (@Req() request, @Param('id') id: string) {
        return await this.deleteBook.execute({
            id,
            owner: request.user.id
        });
    }
}