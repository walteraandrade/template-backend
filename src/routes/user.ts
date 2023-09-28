import * as express from 'express';
import { handleCreateUser, handleGetUser } from '../route-handlers';


const router = express.Router();

router.get('/get-user', (req, res) => {
    handleGetUser(req, res);
});

router.post('/create-user', (req, res) => {
    handleCreateUser(req,res)
})

export const userRouter = router;