import dotenv from 'dotenv';
import express from 'express';
import api from './controllers/api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(api);

app.listen(port, () => console.log(`Application Running on ${port}!`));
