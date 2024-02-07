import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { CreateBook } from '../../../application/use-cases';
import { IsAuthenticatedGuard } from '../../../../shared/guards/is-authenticated.guard';

@Controller()
export class CreateBookController {
    constructor (
        private readonly useCase: CreateBook
    ) {}

    @Post('books')
    @UseGuards(IsAuthenticatedGuard)
    public async controller (@Req() request, @Body() body: CreateBookDto) {
        return await this.useCase.execute({ ...body, owner: request.user.id });
    }
}