import express from 'express';
import { logger } from './logger';
import { userRouter }from './routes/user'
const app = express();

app.use(express.json())
app.use('/user', userRouter)
app.listen(3000, () => logger("Server running on port 3000"));