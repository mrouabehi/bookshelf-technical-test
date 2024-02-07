import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreConfigurationService {
    constructor (private config: ConfigService) {}

    get env (): string {
        return this.config.get<string>('core.env');
    }

    get port (): number {
        return this.config.get<number>('core.port');
    }

    get appUrl (): string {
        return this.config.get<string>('core.app.url');
    }
}
