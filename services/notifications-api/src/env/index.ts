import { envsafe, port } from 'envsafe';

export const env = envsafe({
    PORT: port({
        default: 8001,
        desc: 'Notifications API port',
    })
});