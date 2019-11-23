import mongoose from 'mongoose';
import seedDB from './seedDB';

// Setup and connect to MongoDB
const mongoOpts = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
mongoose.connect(process.env.DB_URL, mongoOpts);
const db = mongoose.connection;

// Handle Errors
db.on('error', err => {
    console.error(`DB: Connection error - ${err}`);
});

// Handle Disconnection
db.on('disconnected', () => {
    console.log('DB: Disconnected');
});

// Handle Connection
db.once('open', () => {
    console.log(`DB: Connected to ${db.name} on ${db.host}`);
});

// Seed Database
if (process.env.DB_SEED === 'true') {
    seedDB();
}
