# 💰 API Financeira

REST API para gerenciamento de usuários e transações financeiras, desenvolvida com Node.js, Express e PostgreSQL.

O projeto permite que usuários realizem autenticação, gerenciem seus dados e controlem suas transações financeiras, com autenticação baseada em JWT e controle de acesso aos recursos pertencentes ao usuário autenticado.

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- JavaScript
- JSON Web Token (JWT)
- bcrypt
- dotenv
- Git

## 📋 Sobre o projeto

A API foi desenvolvida com o objetivo de criar um sistema backend para gerenciamento financeiro, permitindo o cadastro e autenticação de usuários, além do gerenciamento de receitas e despesas.

A aplicação utiliza uma arquitetura organizada em **rotas, controllers, middlewares e configurações**, buscando manter uma separação clara das responsabilidades dentro do projeto.

A autenticação é realizada através de **JWT**, enquanto as senhas dos usuários são armazenadas de forma criptografada utilizando **bcrypt**.

As transações são vinculadas ao usuário autenticado, garantindo que cada usuário possa acessar e manipular apenas seus próprios dados.

## ✨ Funcionalidades

### 👤 Usuários

- Cadastro de usuários
- Login com e-mail e senha
- Autenticação utilizando JWT
- Consulta dos dados do usuário autenticado
- Atualização dos dados do usuário
- Criptografia de senhas utilizando bcrypt
- Validação de dados

### 💳 Transações

- Cadastro de transações
- Consulta das transações do usuário autenticado
- Consulta de uma transação específica
- Atualização de transações
- Exclusão de transações
- Classificação entre entradas e saídas
- Associação das transações às categorias
- Filtro de transações por categoria
- Controle de acesso às transações do usuário autenticado

### 📊 Extrato

- Cálculo do total de entradas
- Cálculo do total de saídas
- Consulta do extrato financeiro do usuário autenticado

### 🔐 Segurança

- Autenticação baseada em JWT
- Senhas armazenadas com hash utilizando bcrypt
- Utilização de variáveis de ambiente para informações sensíveis
- Controle de acesso baseado no usuário autenticado

## 🏗️ Estrutura do projeto

```text
src/
├── config/
│   ├── conexao.js
│   └── senhaJwt.js
│
├── controllers/
│   ├── categorias.js
│   ├── transacoes.js
│   └── usuarios.js
│
├── middlewares/
│   ├── autenticacao.js
│   ├── existeCategoria.js
│   ├── existeTipo.js
│   ├── validacaoTransacoes.js
│   └── validacaoUsuario.js
│
├── routes/
│   └── rotas.js
│
├── index.js
└── servidor.js
```

## 📁 Organização

- **config:** configurações da aplicação, conexão com o banco de dados e chave utilizada na autenticação JWT.
- **controllers:** contém a lógica das operações relacionadas a usuários, categorias e transações.
- **middlewares:** responsáveis pela autenticação e validação dos dados recebidos pelas requisições.
- **routes:** definição dos endpoints disponibilizados pela API.
- **index.js:** ponto de entrada da aplicação.
- **servidor.js:** configuração e inicialização do servidor.

---

## 🔗 Endpoints

### 👤 Usuários

| Método | Endpoint   | Descrição                     | Autenticação |
| ------ | ---------- | ----------------------------- | ------------ |
| POST   | `/usuario` | Cadastrar usuário             | ❌           |
| POST   | `/login`   | Autenticar usuário            | ❌           |
| GET    | `/usuario` | Consultar usuário autenticado | ✅           |
| PUT    | `/usuario` | Atualizar usuário autenticado | ✅           |

### 📂 Categorias

| Método | Endpoint      | Descrição         | Autenticação |
| ------ | ------------- | ----------------- | ------------ |
| GET    | `/categorias` | Listar categorias | ✅           |

### 💳 Transações

| Método | Endpoint             | Descrição                          | Autenticação |
| ------ | -------------------- | ---------------------------------- | ------------ |
| GET    | `/transacao`         | Listar transações do usuário       | ✅           |
| GET    | `/transacao/extrato` | Consultar extrato financeiro       | ✅           |
| GET    | `/transacao/:id`     | Consultar uma transação específica | ✅           |
| POST   | `/transacao`         | Cadastrar uma transação            | ✅           |
| PUT    | `/transacao/:id`     | Atualizar uma transação            | ✅           |
| DELETE | `/transacao/:id`     | Excluir uma transação              | ✅           |

---

## 🔎 Filtro de transações

O endpoint de listagem de transações permite utilizar filtros por categoria através do parâmetro de consulta `filtro`.

### Exemplo

```http
GET /transacao?filtro=alimentacao

 Também é possível utilizar mais de uma categoria:

GET /transacao?filtro=alimentacao&filtro=transporte

```

A API retorna as transações pertencentes às categorias informadas.

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```text
git clone https://github.com/IcaroNatan/cubos-bank-api.git
```

### Entre no diretório:

```text
cd cubos-bank-api
```

## 2. Instale as dependências

```text
npm install
```

## 3. Configure as variáveis de ambiente

### Crie um arquivo .env na raiz do projeto:

```text
DB_USER=postgres
DB_HOST=localhost
DB_NAME=dindin
DB_PASSWORD=sua_senha
DB_PORT=5432

JWT_SECRET=sua_chave_secreta
```

### Importante: não compartilhe o arquivo .env nem suas credenciais. As variáveis de ambiente devem permanecer fora do controle de versão.

## 4. Configure o banco de dados

O projeto utiliza PostgreSQL.

Após criar o banco de dados, execute o arquivo:

```text
database.sql
```

Esse arquivo contém a estrutura necessária para o funcionamento do banco de dados.

Em seguida, execute:

```text
seed.sql
```

O arquivo seed.sql contém os dados iniciais utilizados pela aplicação.

## ▶️ Executando a aplicação

Para iniciar o projeto em modo de desenvolvimento:

```text
npm run dev
```

Para executar a aplicação normalmente:

```text
npm start
```

Por padrão, a API será executada em:

```text
http://localhost:3000
```

## 🔑 Autenticação

As rotas protegidas da aplicação utilizam autenticação baseada em JSON Web Token (JWT).

Primeiro, realize o login através de:

```text
POST /login
```

Após uma autenticação bem-sucedida, a API retorna um token.

Esse token deve ser enviado nas requisições protegidas através do header:

```text
Authorization: Bearer SEU_TOKEN
```

Exemplo:

```text
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

As rotas de cadastro de usuário e login não exigem autenticação.

Todas as demais rotas são protegidas pelo middleware de autenticação.

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL para persistência dos dados.

A estrutura principal do banco pode ser representada da seguinte forma:

```text
usuarios
│
└── transacoes
│
└── categorias
```

Cada transação está relacionada a:

- um usuário;
- uma categoria.

As operações de banco de dados são realizadas utilizando consultas SQL parametrizadas.

## 🧩 Arquitetura

A aplicação utiliza uma estrutura baseada na separação de responsabilidades:

```text
Cliente
│
▼
Routes
│
▼
Middlewares
│
▼
Controllers
│
▼
PostgreSQL
```

### Fluxo de uma requisição autenticada

```text
Requisição HTTP
│
▼
Route
│
▼
Middleware de autenticação
│
▼
Controller
│
▼
PostgreSQL
│
▼
Resposta HTTP
```

Essa organização facilita a manutenção do projeto e permite separar responsabilidades relacionadas a:

- definição das rotas;
- autenticação;
- validação de dados;
- regras de negócio;
- acesso ao banco de dados.

## 📚 Principais aprendizados

Durante o desenvolvimento deste projeto, foram praticados conceitos como:

- Desenvolvimento de APIs REST;
- Node.js e Express;
- Integração com PostgreSQL;
- Operações CRUD;
- Autenticação com JWT;
- Criptografia de senhas com bcrypt;
- Middlewares no Express;
- Validação de dados;
- Controle de acesso baseado em usuário;
- Relacionamentos entre tabelas;
- Consultas SQL;
- Consultas parametrizadas;
- Variáveis de ambiente;
- Tratamento de erros;
- Organização e separação de responsabilidades;
- Implementação de regras de negócio.

## 🎯 Objetivos do projeto

O projeto teve como principais objetivos:

- Praticar o desenvolvimento de uma API REST completa;
- Trabalhar com autenticação e controle de acesso;
- Integrar uma aplicação Node.js com PostgreSQL;
- Implementar operações CRUD;
- Trabalhar com relacionamentos entre entidades;
- Aplicar validações e regras de negócio;
- Organizar uma aplicação backend de forma modular.

## 🎓 Contexto do projeto

Este projeto foi desenvolvido a partir de um desafio de Back-end realizado durante a formação em desenvolvimento da Cubos Academy.

A implementação foi utilizada como oportunidade para aplicar na prática conceitos de desenvolvimento de APIs, autenticação, banco de dados, validação e regras de negócio.

## 👨‍💻 Autor

### Ícaro Natan

### Desenvolvedor Full Stack Júnior

- GitHub: [IcaroNatan](https://github.com/IcaroNatan)
- LinkedIn: [Ícaro Natan](https://www.linkedin.com/in/icaronatan/)
