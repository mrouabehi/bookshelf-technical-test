import { ConflictException } from '@nestjs/common';

export class BookAlreadyExistsException extends ConflictException {
    constructor () {
        super('Book already exists');
    }
}