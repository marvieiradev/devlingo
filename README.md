# DevLingo

DevLingo é um aplicativo gamificado para aprender programação básica de forma prática e divertida, inspirado em plataformas como Duolingo. A proposta da aplicação é ensinar conceitos fundamentais de HTML, CSS e JavaScript através de desafios, lições curtas, progresso visual e recompensas digitais.

## Visão geral

O projeto foi pensado para usuários que desejam começar no mundo da programação sem a complexidade inicial de cursos tradicionais. Com uma experiência leve e motivadora, o app combina teoria, exercícios e feedback imediato para facilitar o aprendizado.

## Tecnologias

- React
- TypeScript
- React Router
- PostgreSQL com Supabase
- Tailwind CSS

## Funcionalidades

- Sistema de aprendizado por níveis e lições
- Exercícios básicos de HTML, CSS e JavaScript
- Interface gamificada com progresso e conquistas
- Navegação por rotas com React Router
- Design responsivo e moderno com Tailwind CSS
- Persistência de dados via Supabase e PostgreSQL
- Experiência de usuário focada em motivação e rotina de estudo

## Estrutura do projeto

```bash
src/
├── components/
├── pages/
├── routes/
├── services/
├── hooks/
├── styles/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/devlingo.git
cd devlingo
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as variáveis do Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. Inicie o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Fluxo de aprendizagem

O app pode seguir um fluxo simples como:

1. Usuário acessa a página inicial
2. Escolhe uma trilha de estudo
3. Realiza lições curtas sobre HTML, CSS ou JavaScript
4. Responde exercícios e desafios
5. Recebe feedback imediato
6. Avança de nível conforme cumpre objetivos

## Licença

Este projeto está sob a licença MIT.

## Autor

Projeto desenvolvido como estudo e prática de desenvolvimento frontend com React e TypeScript.

## Objetivo do projeto

O DevLingo tem como objetivo transformar o aprendizado de programação em uma jornada divertida, acessível e progressiva. A ideia é combinar lógica, prática e motivação para que o usuário avance de forma consistente em conceitos básicos de desenvolvimento web.
