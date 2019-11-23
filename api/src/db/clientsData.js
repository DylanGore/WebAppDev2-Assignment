import clientModel from '../models/ClientModel';

const clients = [
    {
        name: 'Client 1',
        email: 'client1@example.com',
        phone: '+3530800000000',
        id: 1
    },
    {
        name: 'Client 2',
        email: 'client2@example.com',
        phone: '+3530800000000',
        id: 2
    },
    {
        name: 'Client 3',
        email: 'client1@example.com',
        phone: '+3530800000000',
        id: 3
    },
    {
        name: 'Client 4',
        email: 'client4@example.com',
        phone: '+3530800000000',
        id: 4
    }
];

export default async function loadClients() {
    try {
        await clientModel.deleteMany();
        await clientModel.collection.insertMany(clients);
        console.info(`DB: ${clients.length} clients added to collection.`);
    } catch (err) {
        console.error(`DB: Failed to add data to clients collection - ${err}`);
    }
}
