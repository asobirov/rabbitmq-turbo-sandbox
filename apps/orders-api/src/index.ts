import express from 'express'
import amqp from 'amqplib';

import { env } from './env';

const app = express();

const amqpUrl = 'amqp://localhost:5672';

const objToBuffer = <T extends object>(obj: T) => Buffer.from(JSON.stringify(obj));

app.get('/', async (req, res) => {
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();

        // Checks if the queue exists, if not, it creates it
        await channel.assertQueue("order.shipped");

        // Sends a message to the queue
        channel.sendToQueue("order.shipped", Buffer.from(JSON.stringify({ orderId: new Date().getTime() })));
    } catch (error) {
        console.log(error);
    }

    res.send("Orders API");
})

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
})
