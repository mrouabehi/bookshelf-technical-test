import { Module } from '@nestjs/common';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { BooksModule } from './books/books.module';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

@Module({
    imports: [
        ConfigurationModule,
        BooksModule
    ],
    providers: [
        IsAuthenticatedGuard
    ]
})
export class RootModule {}
