import { NestFactory, Reflector } from '@nestjs/core';
import { RootModule } from './module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CoreConfigurationService, CorsConfigurationService } from './shared/configuration/services';
import { validationExceptionFactory } from './shared/exceptions/validation.exception';

async function bootstrap () {
    const app = await NestFactory.create(RootModule);

    const coreConfiguration = app.get(CoreConfigurationService);
    const corsConfiguration = app.get(CorsConfigurationService);

    app.enableCors(corsConfiguration.options);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        exceptionFactory: validationExceptionFactory,
        transformOptions: { enableImplicitConversion: true }
    }));

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    await app.listen(coreConfiguration.port);
}
bootstrap();
