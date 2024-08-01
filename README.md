
# Solar Power Simulation App

## Descrição
Esta aplicação é um sistema para simulação de geradores de energia solar, onde clientes podem se cadastrar, fazer login, atualizar seus perfis e realizar simulações. O backend é desenvolvido em Ruby on Rails, com o frontend em Next.js e o banco de dados PostgreSQL.

## Tecnologias Utilizadas
- **Backend**: Ruby on Rails (versão 7)
- **Frontend**: Next.js (versão mais estável)
- **Banco de Dados**: PostgreSQL (versão 14)
- **Autenticação**: JWT (JSON Web Tokens)
- **Deploy local**: Docker

## Funcionalidades Implementadas

### 1. CRUD de Clientes
- **Cadastro de Clientes**: Clientes podem se cadastrar com nome, email e senha.
  - **Regra**: Não é permitido o cadastro de clientes com o mesmo email.
- **Atualização de Clientes**: Clientes podem atualizar seus dados de perfil, como nome e senha, mas o email permanece não editável.
- **Exclusão de Clientes**: Clientes podem ser removidos do sistema.
- **Visualização de Clientes**: É possível visualizar os dados cadastrados do cliente.
  - Todas as consultas de cliente são feitas com base no ID do cliente, mantendo o email como um campo único e não editável.

### 2.Simulação de Energia Solar
- **Simulação de Geradores**: Clientes podem realizar simulações para determinar o gerador de energia solar ideal para suas necessidades.
  - **Regra**: Cada cliente pode realizar até 5 simulações por dia e apenas clientes logados podem realizar simulações.
  - A simulação calcula a potência necessária usando a fórmula: Potência (kWp) = Valor da Conta de Luz / 94,5.
  - A simulação retorna geradores mais indicados, utilizando dados da API externa: Mockaroo API.
  - Um PDF é gerado para cada simulação, contendo os dados da simulação e os geradores recomendados.

### 3. Navbar (Barra de Navegação)
- A navbar contém os seguintes botões:
  - **Home**: Redireciona para a página inicial.
  - **Cadastro**: Redireciona para a página de cadastro de clientes.
  - **Login**: Posicionado à direita, redireciona para a página de login.
  - **Perfil**: Após o login, exibe o nome do cliente logado, e ao clicar redireciona para a página de perfil.
  - **Logout**: Posicionado à direita do nome do cliente, permite que o cliente faça logout.

### 4. Funcionalidades de Autenticação
- **Login**: Permite que clientes façam login com email e senha.
- **Logout**: Permite que clientes façam logout, removendo o token de autenticação do armazenamento local.

### 5. Rotas e Configurações
- **Backend**:
  - Rota para cadastro: `POST /clients`
  - Rota para atualização de perfil: `PATCH /clients/:id`
  - Rota para visualização de cliente: `GET /clients/:id`
  - Rota para login: `POST /login`
  - Implementação do controlador `ClientsController` para gerenciar as ações de cliente.
  - Implementação do controlador `SessionsController` para gerenciar as sessões de login/logout.
  - Configuração de CORS para permitir requisições do frontend Next.js ao backend Ruby on Rails.
- **Frontend**:
  - **Página de Cadastro**: Implementada em `pages/clientes/cadastro.js`
  - **Página de Login**: Implementada em `pages/login.js`
  - **Página de Perfil**: Implementada em `pages/clientes/[id].js`, onde as consultas são realizadas pelo ID do cliente.

## Como Executar o Projeto

### Backend
1. **Instalação de Dependências**:
   ```bash
   bundle install
   ```
2. **Configuração do Banco de Dados**:
   ```bash
   rails db:create
   rails db:migrate
   ```
3. **Inicialização do Servidor**:
   ```bash
   rails server
   ```

### Frontend
1. **Instalação de Dependências**:
   ```bash
   npm install
   ```
2. **Inicialização do Servidor**:
   ```bash
   npm run dev
   ```

### Testando a API
1. Utilize o Insomnia ou outro cliente REST para testar as rotas da API:
   - **Cadastro**: `POST http://localhost:3000/clients`
   - **Login**: `POST http://localhost:3000/login`
   - **Atualização de Perfil**: `PATCH http://localhost:3000/clients/:id`
   - **Simulação**: POST http://localhost:3000/clients/:client\_id/simulations
   - **Listar Simulações**: GET http://localhost:3000/clients/:client\_id/simulations

### Possíveis Erros e Soluções
- **CORS**: Certifique-se de que as configurações de CORS estão corretamente definidas no backend para permitir requisições do frontend.
- **Token de Autenticação**: Verifique se o token JWT está sendo gerado e armazenado corretamente para a autenticação.
- **Geração de PDF**: Se estiver usando a gem Prawn, assegure-se de que os diretórios de destino existem antes de salvar o arquivo PDF.
