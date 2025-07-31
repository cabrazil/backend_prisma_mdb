# Backend API

API backend construída com Fastify, TypeScript e Prisma.

## Deploy na Vercel

### Pré-requisitos

1. Tenha uma conta na [Vercel](https://vercel.com)
2. Instale o Vercel CLI:
```bash
npm i -g vercel
```

### Configuração do Banco de Dados

Para o deploy na Vercel, você precisará de um banco de dados PostgreSQL. Recomendamos:

1. **Vercel Postgres** (integrado)
2. **Neon** (https://neon.tech)
3. **Supabase** (https://supabase.com)
4. **Railway** (https://railway.app)

### Variáveis de Ambiente

Configure as seguintes variáveis no painel da Vercel:

- `DATABASE_URL`: URL do seu banco de dados PostgreSQL
- `NODE_ENV`: production

### Deploy

1. **Via CLI:**
```bash
# Login na Vercel
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

2. **Via GitHub:**
- Conecte seu repositório GitHub à Vercel
- Configure as variáveis de ambiente
- Faça push das mudanças

### Estrutura do Projeto

```
├── src/
│   ├── server.ts          # Servidor principal
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Controladores
│   ├── services/          # Serviços
│   └── types/            # Tipos TypeScript
├── prisma/
│   └── schema.prisma     # Schema do banco
├── vercel.json           # Configuração Vercel
└── package.json
```

### Comandos Locais

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Start produção
npm start
```

### URLs da API

Após o deploy, sua API estará disponível em:
- `https://seu-projeto.vercel.app`

### Observações Importantes

1. **Banco de Dados**: Certifique-se de que o banco está acessível publicamente
2. **CORS**: Já configurado para aceitar requisições do frontend
3. **Porta**: A Vercel gerencia automaticamente a porta
4. **Logs**: Disponíveis no painel da Vercel 