import express from 'express'
import { env } from './env';
import ampq from 'amqplib';

const app = express();

const amqpUrl = 'amqp://localhost:5672';

// Set up a connection to the RabbitMQ server
try {
    const connection = await ampq.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("order.shipped");

    channel.consume("order.shipped", (message) => {
        console.log("RECIEVED MESSAGE FROM ORDER.SHIPPED QUEUE");
        if (!message) {
            console.log("Empty message received");
            return;
        }
        console.log(message.content.toString());

        // Acknowledge the message
        channel.ack(message);
    })
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    res.send("Notifications API");
})

app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`);
})
