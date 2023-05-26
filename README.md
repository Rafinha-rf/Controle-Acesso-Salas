# Controle-Acesso-Salas
# ATIVIDADE INE5670-04238A
sistema para controle de acesso às salas de aula e laboratórios
Você deve criar um backend de um sistema para controle de acesso às salas de aula e laboratórios do CTC utilizando o cartão de identificação da UFSC.

O backend será composto por cinco microservices, responsáveis pelas funcionalidades descritas a seguir:

cadastro de usuários: mantém os dados de cada usuário do sistema, como o nome, tipo de usuário (estudante, técnico ou professor), código do curso (para estudantes) ou setor de lotação (técnico ou professor), e número de matrícula;
cadastro de salas: registro das salas do CTC que possuem controle de acesso eletrônico, indicando o número da sala e a identificação do prédio no qual a sala está localizada;
controle de acesso: possui registros indicando os usuários que têm acesso a cada sala cadastrada no sistema;
liberação de acesso: recebe um usuário e uma sala e indica se o usuário deve ter acesso à sala (ou seja, a porta deve ser aberta) ou não;
registro de acessos: registra todas as tentativas de acesso às salas do CTC.

<p float="left">
 <img src="https://i.imgur.com/CNEGx9C.png" width="900" />
</p>


Considere que o backend do sistema poderá ser acessado tanto por leitores de cartão instalados nas portas das salas quanto por aplicativos para cadastro e gerenciamento do sistema. Nessa atividade não será necessário implementar estes frontends; verificaremos o funcionamento do backend enviando requisições de teste aos serviços a partir de ferramentas como o Postman.

Os microservices devem ser acessados por meio de um API gateway, que deve fornecer uma interface REST para acesso aos serviços. Sugere-se que as interações do gateway com os microservices também sejam feitas por meio de requisições REST. O uso de outras tecnologias que não foram vistas na disciplina, como serviços de mensageria (RabbitMQ, Kafka, ...), Thrift e gRPC, também é permitido, caso você já domine a tecnologia que deseja utilizar.

O API gateway e os microservices podem ser implementados utilizando o Node.js ou qualquer outra tecnologia que você domine. Como servidor de banco de dados podem ser usados o MongoBD (ver tutorial), o SQLite (ver exemplo) ou qualquer outro banco de dados que você saiba utilizar. 

Cada serviço deve ter seu banco de dados, database ou collection própria, de modo que um microservice não deverá acessar os dados de outro. Sempre que for necessário ler ou alterar um dado de outro serviço, deve ser enviada uma requisição a ele (Dica: use o Axios para enviar uma requisição REST para outro microservice). 
