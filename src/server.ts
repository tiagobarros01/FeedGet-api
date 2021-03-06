import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';

import { routes } from './http/routes/index.routes';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(PORT, () => console.log(`Server is running at port ${PORT} 🔥`));
