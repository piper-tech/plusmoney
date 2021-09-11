# Como rodar localmente?

Para rodar este projeto localmente, é necessário ter o [docker](https://www.docker.com/) e o [docker compose](https://docs.docker.com/compose/install/) instalado.
 1. Crie um arquivo .env e preencha todas as variáveis de ambiente, use o .env.example como base
 2. Na raiz do projeto, execute o comando `docker-compose up` para subir todos os containers e rodar a aplicação, a primeira execução do comando pode ser um pouco lenta.
 * Para ter acesso ao shell do container do servidor, execute o comando `docker container exec -it plusmoney_app_1 sh` em uma nova janela do terminal.
 * Para ter acesso ao shell do container do banco de dados, execute o comando `docker container exec -it plusmoney_database_1 mysql` em uma nova janela do terminal.