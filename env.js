import dotenv from 'dotenv';

// Laod variabled fron .env file
const result = dotenv.config();

// Handle errors while loading .env
if (result.error) {
    console.error('Unable to load .env file!');
    throw result.error;
}
