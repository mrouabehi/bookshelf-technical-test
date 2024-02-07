import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedBookAccessException extends UnauthorizedException {
    constructor () {
        super('You are not allowed to access this book');
    }
}