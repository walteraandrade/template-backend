import { createServer } from 'http';
import { logger } from './logger';

const server = createServer((req, res) => {

    res.write("Hello, Wold!")
    return res.end()
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => logger(`Server is listening on port ${PORT}`));
