import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT = 3000,
    AUTHTOKEN,
} = process.env;
