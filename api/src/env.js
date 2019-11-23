import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
    console.error('Unable to load .env file!');
    throw result.error;
}
