import { envsafe, port, url } from 'envsafe';

export const env = envsafe({
    PORT: port({
        default: 8002,
        desc: 'Orders API port',
    }),
    AMQP_URL: url({
        default: 'amqp://localhost:5672',
        desc: 'AMQP URL',
    }),
});