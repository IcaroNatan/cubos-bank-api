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
