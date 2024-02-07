import { NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
    constructor () {
        super('Book not found');
    }
}