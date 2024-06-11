# TODOS com QUALIDADE 

O TODOS com QUALIDADE foi um projeto desenvolvido em conjunto com o curso do Mário Souto, onde o desafio era construir um simples todo list fullstack mas como diz o nome, com qualidade! o foco desse projeto foi a estruturação e qualidade do código tanto na parte da API quanto na parte do frontend.


## Funcionalidades

- Adicionar, editar, remover e atualizar TODOS

## Requisitos para rodar o projeto localmente

- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

 
# Tecnologias Utilizadas
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)



## Rodando localmente o projeto

1. Clone o repositório

    ```bash
   git clone git@github.com:gabesouto/todos-com-qualidade.git
    ```

2. Navegue para o repositório

    ```bash
    cd todos-com-qualidade
    ```

3. Instale as depêndencias

    ```bash
    npm install
    ```


4. Inicie a aplicação. a API estará disponivel em  `http://localhost:3000`   

    ```bash
    npm run dev
    ```

<h2 id="routes">📍 Documentação da API</h2>

Here's a list the main routes of this API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /api/todos</kbd>     | recupera todas as TODOS, veja: [response details](#get-todos)
| <kbd>POST /api/todos</kbd>     | registra um novo TODO, veja:: [request details](#post-tododos)
| <kbd>GET /api/todos?page={page}&limit={limit} </kbd>     | recupera uma quantidade X de TODOS com base no número de páginas e limite passados, veja [request details](#get-todos-query)
| <kbd>PUT /api/todos/{todoID}/toggle-done</kbd>     | altera o estado de uma TODO, veja [request details](#toggle-done)
| <kbd>DELETE /api/{todoID}/crops</kbd>     | remove um TODO, veja [request details](#delete-todo)

