import { Module } from '@nestjs/common';
import { booksControllers } from './presentation/controllers';
import { booksUseCases } from './application/use-cases';
import { booksRepositories } from './infrastructure/repositories';

@Module({
    imports: [],
    controllers: [
        ...booksControllers
    ],
    providers: [
        ...booksRepositories,
        ...booksUseCases
    ],
    exports: []
})
export class BooksModule {}