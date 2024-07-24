import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const routeFiles = readdirSync(path.join(__dirname, './routes'));
routeFiles.forEach(async (route) => {
    const { default: routeModule } = await import(`./routes/${route}`);
    app.use('/api/v1', routeModule);
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server Port: ${PORT}`);
    });
};

server();
