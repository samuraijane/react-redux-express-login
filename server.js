const { apiRouter, authRouter } = require('./routes');
const cors = require('cors');
const express = require('express');
const path = require('path');

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

// middleware
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.static(path.resolve(`${__dirname}/react-ui/build`)));
server.use('/api', apiRouter);
server.use('/auth', authRouter);

// test endpoint
server.get('/heartbeat', (req, res) => {
  res.json({is: 'working'});
});

// delegate client-side routing to react
server.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/react-ui/build/index.html`));
});

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080.')
});