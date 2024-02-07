import { ConfigService } from '@nestjs/config';
import { CoreConfigurationService } from './core.configuration.service';
import { CorsConfigurationService } from './cors.configuration';

export const services = [
    ConfigService,
    CoreConfigurationService,
    CorsConfigurationService
];

export {
    CoreConfigurationService,
    CorsConfigurationService
}