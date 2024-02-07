import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ConfigurationSchema from './configuration.schema';

import { configurations } from './configurations';
import { services } from './services';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            cache: true,
            expandVariables: true,
            validationSchema: ConfigurationSchema,
            load: [
                ...configurations
            ],
        })
    ],
    providers: [
        ...services
    ],
    exports: [
        ...services
    ]
})
export class ConfigurationModule {}