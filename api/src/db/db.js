import mongoose from 'mongoose';
import { seedAll } from './SeedDB';

// MongoDB
const mongoOpts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_URL, mongoOpts);
const db = mongoose.connection;

db.on('error', err => {
    console.error(`DB: Connection error - ${err}`);
});

db.on('disconnected', () => {
    console.log('DB: Disconnected');
});

db.once('open', () => {
    console.log(`DB: Connected to ${db.name} on ${db.host}`);
});

// Seed Database
if (process.env.DB_SEED === 'true') {
    seedAll();
}
