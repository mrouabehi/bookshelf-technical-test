import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
    constructor (public errors: Record<string, unknown>) {
        super(errors);
    }
}

const formatError = (errors: ValidationError[]) => {
    const errorMessages = {};

    errors.forEach((error: ValidationError) => {
        console.log(error);
        errorMessages[error.property] = error.children.length
            ? formatError(error.children)
            : Object.values(error.constraints)[0];
    });

    return errorMessages;
};

export const validationExceptionFactory = (errors: ValidationError[]) => {
    return new ValidationException(formatError(errors));
};