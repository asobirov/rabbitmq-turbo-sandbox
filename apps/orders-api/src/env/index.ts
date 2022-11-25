import { envsafe, port } from 'envsafe';

export const env = envsafe({
    PORT: port({
        default: 8002,
        desc: 'Orders API port',
    })
});