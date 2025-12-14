# EverMoment - Plataforma de Convites Digitais

Plataforma moderna para criar, personalizar e compartilhar convites digitais com temas exclusivos, galeria de fotos e confirmação de presença.

## 🚀 Features

- ✨ 6 temas exclusivos de convites
- 📸 Galeria de fotos (3-10 conforme plano)
- 🎵 Música de fundo (Premium)
- 💳 Pagamento com Stripe
- 📧 Confirmação de presença por email
- 🗑️ Auto-delete após evento
- 🎯 Share de links únicos
- 💾 Dados em banco MySQL

## 📋 Requisitos

- Node.js 18+
- MySQL 5.7+
- Conta Stripe (testes ou produção)
- Servidor SMTP (Hostinger ou similar)

## 🔧 Instalação

### 1. Clonar e instalar dependências

```bash
git clone <repo-url>
cd evermoment
npm install
```

### 2. Configurar variáveis de ambiente

Criar arquivo `.env.local`:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/evermoment"

# Stripe (Test Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx..."
STRIPE_SECRET_KEY="sk_test_xxx..."
STRIPE_WEBHOOK_SECRET="whsec_xxx..."

# Stripe Prices
STRIPE_PRICE_BASIC="price_xxx..."
STRIPE_PRICE_PREMIUM="price_xxx..."

# Email (SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_USER="seu-email@dominio.com"
SMTP_PASS="sua-senha"
EMAIL_FROM="EverMoment <seu-email@dominio.com>"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Criar banco de dados

```bash
mysql -u root -p
CREATE DATABASE evermoment;
EXIT;
```

### 4. Executar migrações Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
evermoment/
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe checkout
│   │   ├── invites/           # CRUD de convites
│   │   ├── rsvp/[id]/         # Confirmação de presença
│   │   └── webhooks/stripe/   # Webhook Stripe
│   ├── editor/                # Editor multi-step
│   ├── themes/                # Seleção de tema
│   ├── i/[id]/               # Visualização do convite
│   ├── sucesso/              # Página de sucesso
│   └── page.tsx              # Homepage
├── components/
│   ├── StripeCheckoutButton.tsx
│   └── ui/
├── lib/
│   ├── prisma.ts             # Cliente Prisma
│   ├── types.ts              # Tipos TypeScript
│   └── utils.ts
├── prisma/
│   └── schema.prisma         # Schema do banco
└── public/
```

## 💳 Configuração Stripe

### Obter Chaves de Teste

1. Acessar [dashboard.stripe.com](https://dashboard.stripe.com)
2. Ativar "Test mode"
3. Copiar chaves publicável e secreta
4. Criar produtos e preços:
   - Basic: R$ 29,90 (mensal)
   - Premium: R$ 49,90 (mensal)

### Configurar Webhook

1. Settings → Webhooks
2. Adicionar endpoint: `https://seu-dominio.com/api/webhooks/stripe`
3. Selecionar eventos: `checkout.session.completed`, `checkout.session.expired`
4. Copiar chave assinada e salvar em `.env.local`

## 📧 Configuração SMTP

### Hostinger

1. Painel Hostinger → Email
2. Criar email: `convites@seu-dominio.com`
3. Configurar SMTP:
   - Host: `smtp.hostinger.com`
   - Porta: `465` (SSL)
   - Usuário: email completo
   - Senha: conforme definido

## 🗄️ Database Schema

### Tabelas Principais

**Invite**
- id, title, eventType, date, time, location
- name1, name2, email, phone
- photos, message, musicUrl
- theme, plan, isPaid, paymentId
- createdAt, expiresAt

**Rsvp**
- id, inviteId, name, email, attending
- createdAt, updatedAt

**Payment**
- id, stripeSessionId, inviteId, amount
- status, metadata, createdAt

## 🚀 Deploy

### Vercel

```bash
# Conectar repositório e fazer push
git push origin main

# Configurar variáveis de ambiente no Vercel
# (mesmo que .env.local)

# Deploy automático
```

### Hostinger (Node.js)

```bash
npm run build
npm start
```

## 🔐 Segurança

- ✅ Validação de entrada (Zod)
- ✅ Rate limiting em produção
- ✅ HTTPS obrigatório
- ✅ Chaves de API em variáveis de ambiente
- ✅ Webhook signature verification
- ✅ CORS configurado

## 📱 Tema Mobile

Todos os componentes são responsivos com Tailwind CSS.

## 🎨 Customização

### Adicionar Novo Tema

1. Editar `app/editor/page.tsx` - array `themeColors`
2. Adicionar cor em formato Tailwind: `from-cor1 to-cor2`
3. Atualizar limites de plano se necessário

### Mudar Preços

1. Criar novos preços no Stripe
2. Atualizar `STRIPE_PRICE_BASIC` e `STRIPE_PRICE_PREMIUM`
3. Alterar valores em `StripeCheckoutButton.tsx`

## 🐛 Troubleshooting

### Erro de Conexão MySQL

```bash
# Verificar serviço
mysql --version
mysql -u root -p

# Criar banco se não existir
CREATE DATABASE evermoment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Erro Stripe

```
error: "Stripe signature verification failed"
```

Verificar `STRIPE_WEBHOOK_SECRET` em `.env.local`

### Email não funciona

Testar conexão SMTP:
```bash
npm install -g smtp-server
```

## 📞 Suporte

Email: suporte@evermoment.com.br

## 📄 Licença

MIT License

---

**EverMoment** - Crie momentos memoráveis digitalmente ✨
