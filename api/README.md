<div align="center">
    <h1><strong>Restful API - Backend</strong></h1>
    <h3>
        <strong>Pós Graduação Latu Sensu em Engenharia de Software</strong><br/>
        <small><em>Pontifícia Universidade Católica de Minas Gerais</em></small>
    </h3>
    <image src="../docs/misc/nutritia-no-bg.png"/><br/>
    <em>PUC Minas - 2023</em>
</div>
<hr/>

## Exemplo de variáveis de ambiente
```
JWT_SECRET=abc@123
DATABASE_HOST=localhost
DATABASE_PORT=3307
DATABASE_USER=root
DATABASE_PASSWORD=nutritia_password
DATABASE_SCHEMA=nutritia_db
RUN_MIGRATIONS=true
```

## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
