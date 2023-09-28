import { createServer } from 'http';
import { logger } from './logger';
import { router } from './router';
import { requestParser } from './middlewares/http-handler';


const server = createServer((req, res) => {
    router(req, res)
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => logger(`Server is listening on port ${PORT}`));
