import { registerAs } from '@nestjs/config';

export default registerAs('core', () => ({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
    app: {
        url: process.env.NODE_ENV === 'production' ? 'https://app.templaate.io' : 'http://localhost:3100'
    }
}));
