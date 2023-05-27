const { spawn } = require('child_process');

// Função para iniciar um microsserviço
function startMicroservice(name, port) {
  console.log(`Iniciando o microsserviço ${name} na porta ${port}`);

  const microservice = spawn('node', [name]);

  microservice.stdout.on('data', (data) => {
    console.log(`${name}: ${data}`);
  });

  microservice.stderr.on('data', (data) => {
    console.error(`${name} Erro: ${data}`);
  });

  microservice.on('close', (code) => {
    console.log(`${name} encerrado com código ${code}`);
  });
}

// Iniciar os microsserviços
function startMicroservices() {
  // Definir os microsserviços a serem iniciados
  const microservices = [
    { name: 'cadastro-usuario-service/cadastroUsuarioService.js', port: 3001 },
    { name: 'cadastro-salas-service/cadastroSalaService.js', port: 3002 },
    { name: 'controle-acesso-service/ControleAcessoService.js', port: 3003 },
    { name: 'registro-acesso-service/RegistroAcessoService.js', port: 3004 },
    { name: 'liberacao-acesso-service/LiberacaoAcessoService.js', port: 3005 }
  ];

  // Iniciar cada microsserviço em um processo separado
  microservices.forEach((microservice) => {
    startMicroservice(microservice.name, microservice.port);
  });
}

// Iniciar os microsserviços
startMicroservices();
