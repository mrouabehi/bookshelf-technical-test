import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'staging', 'production').default('production'),
    PORT: Joi.number().port().default(3000),
    DATABASE_HOST: Joi.string().default('localhost'),
    DATABASE_PORT: Joi.number().port().default(5432),
    DATABASE_NAME: Joi.string().default('postgres'),
    DATABASE_USERNAME: Joi.string().default('admin'),
    DATABASE_PASSWORD: Joi.string().default('admin'),
    DATABASE_LOGGING: Joi.boolean().default(false),
    DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
    ACCESS_TOKEN_KEY: Joi.string().required(),
    ACCESS_TOKEN_EXPIRATION: Joi.string().default('25m'),
    REFRESH_TOKEN_KEY: Joi.string().required(),
    REFRESH_TOKEN_EXPIRATION: Joi.string().default('4w'),
});
