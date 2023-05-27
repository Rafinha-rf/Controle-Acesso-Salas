const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
const logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
  if (req.path.startsWith('/Usuarios'))
    return 'http://localhost:3001/';
  else if (req.path.startsWith('/Salas'))
    return 'http://localhost:3002/';
  else if (req.path.startsWith('/Acessos'))
    return 'http://localhost:3003/';
  else if (req.path.startsWith('/RegistroAcesso'))
    return 'http://localhost:3004/';
  else if (req.path.startsWith('/LiberacaoAcesso'))
    return 'http://localhost:3005/';
  else
    return null;
}

app.use((req, res, next) => {
  const proxyHost = selectProxyHost(req);
  if (proxyHost == null)
    res.status(404).send('Not found');
  else
    httpProxy(proxyHost)(req, res, next);
});

app.listen(8000, () => {
  console.log('API Gateway iniciado!');
});