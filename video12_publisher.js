// rabbit mq
// https://puffin.rmq2.cloudamqp.com/#/
// this code is not working 

const amqp = require('amqplib')
const msg = { number: process.argv[2] }

const connect = async () => {
    try {
        const connection = await amqp.connect(process.env.AMP_CONNECTION);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('jobs');
        channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(error);
    }
}

connect()