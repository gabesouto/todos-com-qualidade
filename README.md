# TODOS com QUALIDADE 

  <p align="center">
  <img 
    src="https://github.com/gabesouto/todos-com-qualidade/blob/main/public/home.png"
    align="center" 
    height="auto" 
    width="auto" 
  >
<p/>


# Overview

O TODOS com QUALIDADE foi um projeto desenvolvido em conjunto com o curso do Mário Souto, onde o desafio era construir um simples todo list fullstack mas como diz o nome, com qualidade! o foco desse projeto foi a estruturação e qualidade do código tanto na parte da API quanto na parte do frontend.


## Deploy
[TODOS com QUALIDADE](https://todos-com-qualidade.vercel.app/)

Acesse o site no seu navegador clicando no link acima.


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

Lista de endpoints da aplicação:
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /api/todos</kbd>     | recupera todas as TODOS, veja: [response details](#get-todos)
| <kbd>POST /api/todos</kbd>     | registra um novo TODO, veja:: [request details](#post-tododos)
| <kbd>GET /api/todos?page={page}&limit={limit} </kbd>     | recupera uma quantidade X de TODOS com base no número de páginas e limite passados, veja [request details](#get-todos-query)
| <kbd>PUT /api/todos/{todoID}/toggle-done</kbd>     | altera o estado de uma TODO, veja [request details](#toggle-done)
| <kbd>DELETE /api/{todoID}/crops</kbd>     | remove um TODO, veja [request details](#delete-todo)


<h3 id="get-todos" >GET /api/todos</h3>


**RESPONSE**
```json
{
  "todos":
[
    {
      "id": "043dde67-82b7-48be-ad32-71bb0d2fcdf5",
      "content": "study math",
      "date": "2024-06-11T15:27:37.216Z",
      "done": false
    },
    {
      "id": "7c77fcab-1e34-4886-889c-7b76fb3525fa",
      "content": "test ruim ",
      "date": "2024-06-10T21:16:02.280Z",
      "done": true
    },
]
}
```


<h3 id="get-todos-query">GET /api/todos?page=1&limit=2</h3>

**RESPONSE**
```json
{
  "todos": [
    {
      "id": "043dde67-82b7-48be-ad32-71bb0d2fcdf5",
      "content": "study math",
      "date": "2024-06-11T15:27:37.216Z",
      "done": false
    },
    {
      "id": "7c77fcab-1e34-4886-889c-7b76fb3525fa",
      "content": "test ruim ",
      "date": "2024-06-10T21:16:02.280Z",
      "done": true
    }
  ],
}
```

<h3 id="post-todo">POST /api/todos</h3>


**REQUEST**
```json
{
  "content": "study math"
}
```

**RESPONSE**
```json
{
  "todo": {
    "id": "a5e96c84-51c7-40ea-908e-ff6bcfc1b641",
    "content": "study math",
    "date": "2024-06-11T15:37:08.595Z",
    "done": false
  }
}
```


<h3 id="toggle-done">PUT /api/{todoId}/toggle-done</h3>


**RESPONSE**
```json
{
  "todo": {
    "id": "a5e96c84-51c7-40ea-908e-ff6bcfc1b641",
    "content": "study math",
    "date": "2024-06-11T15:37:08.595Z",
    "done": true
  }
}
```

<h3 id="delete-todos">DELETE /api/{todoId}</h3>
```

**RESPONSE**
```json
no content
```

#  How To Reach Me:
 <a href="mailto:soutogabriel04@gmail.com?"><img src="https://img.shields.io/badge/gmail-%23DD0031.svg?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
 [![image](https://img.shields.io/badge/Linkedin-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielsouto-developer/)


