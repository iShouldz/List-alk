![readme](src/assets/badge.png)

# Instalação
Navegue para o front-end e execute: 
```
npm install 
```
# Execução do sistema
Execute dois terminais, para executar o frontend e backend. Para o backend, é utilizado o json-server que simula um back-end real.

1. Em um terminal, navegue ate a pasta do frontend e use o comando

```
npm run dev
```

2. No segundo terminal, navegue ate a pasta do backend e use o comando. O backend do json-server será executado na porta 3000.

```
npx json-server --watch db.json
```

# Verbos HTTP implementados
- GET
- POST
- DELETE
- UPDATE

# Deploy

Deploy realizado na plataforma [Vercel](https://vercel.com/) para fins de demonstração do projeto. É necessario estar com o backend rodando na sua maquina para funcionar corretamente. Em implementações futuras, o deploy sera ajustado com um deploy exclusivo para o backend.

# Recursos
1. [React](https://react.dev)
2. [Json-server](https://github.com/typicode/json-server)
