import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CoreConfigurationService } from './core.configuration.service';

@Injectable()
export class CorsConfigurationService {
    constructor (private config: CoreConfigurationService) {}

    get options () {
        const isProduction = this.config.env === 'production';

        const corsOptions: CorsOptions = { credentials: true };

        if (isProduction) {
            corsOptions.origin = [
                'https://templaate.io',
                'https://www.templaate.io',
                'https://app.templaate.io',
                'https://admin.templaate.io',
            ];
        } else {
            corsOptions.origin = true;
        }

        return corsOptions;
    }
}
