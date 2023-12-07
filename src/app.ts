import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoute } from './modules/user/user.route';
// const port = 3000;

//Parser
app.use(express.json());
app.use(cors());

app.use('/api', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(' assignment 2 running');
});

export default app;
