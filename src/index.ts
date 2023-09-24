import { createServer } from 'http';
import { logger } from './logger';
import { router } from './router';

const server = createServer((req, res) => {
    router(req, res, req.url)
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => logger(`Server is listening on port ${PORT}`));
