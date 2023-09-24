import { createServer } from 'http';

const server = createServer((req, res) => {

    res.write("Hello, Wold!")
    return res.end()
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
