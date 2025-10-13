# 🤖 Prompt Creator AI

![Hero](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

`Prompt Creator AI` é uma aplicação web desenvolvida para facilitar a criação, gerenciamento e utilização de prompts para modelos de inteligência artificial. Com uma interface moderna e intuitiva, os usuários podem organizar suas ideias e otimizar a interação com IAs.

## ✨ Funcionalidades

- **Criação de Prompts:** Interface amigável para escrever e estruturar prompts.
- **Gerenciamento:** Organize e categorize seus prompts para fácil acesso.
- **Autenticação de Usuários:** Sistema seguro de login e registro com Supabase.
- **Interface Responsiva:** Design moderno construído com Shadcn/UI e Tailwind CSS, adaptável a qualquer dispositivo.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Frontend:**
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI para componentes de UI.
  - React Hook Form para gerenciamento de formulários.
  - Zod para validação de schemas.
  - React Router para roteamento.

- **Backend & Banco de Dados:**
  - Supabase como Backend-as-a-Service (BaaS) para autenticação e banco de dados.

- **Ferramentas de Desenvolvimento:**
  - ESLint para linting de código.

## 🏁 Começando

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/prompt-creator-ai.git
   cd prompt-creator-ai
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```
   ou
   ```bash
   pnpm install
   ```

5. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

   Abra http://localhost:5173 (ou a porta indicada no terminal) no seu navegador para ver a aplicação.

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o linter para verificar a qualidade do código.
- `npm run preview`: Inicia um servidor local para visualizar a build de produção.
