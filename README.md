# 🎉 EverMoment - Plataforma de Convites Digitais

Sistema completo de convites digitais personalizados com integração de pagamento Stripe, inspirado no LoveYuu mas focado em eventos especiais (casamentos, aniversários, chá de bebê, formaturas, etc.).

## ✨ Funcionalidades

### Para Criadores de Convites
- 💳 **Pagamento via Stripe** - Checkout seguro com cartão de crédito
- 📱 **QR Code Personalizado** - Gerado automaticamente e enviado por e-mail
- 🎨 **Templates Elegantes** - Design específico para cada tipo de evento
- ⏰ **Contador Regressivo** - Contagem em tempo real até o evento
- 📧 **E-mail Automático** - Envio do convite e QR Code após pagamento
- 🖼️ **Galeria de Fotos** (Premium) - Até 10 fotos no convite
- 🎵 **Música de Fundo** (Premium) - URL personalizada de música

### Para Convidados
- 📲 **Acesso via QR Code ou Link** - Fácil compartilhamento
- ✅ **Confirmação de Presença (RSVP)** - Sistema integrado de confirmação
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em mobile
- 🎭 **Animações Suaves** - Experiência visual premium

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilização**: TailwindCSS + Framer Motion
- **Banco de Dados**: MySQL + Prisma ORM
- **Pagamento**: Stripe Checkout + Webhooks
- **E-mail**: Resend
- **Validação**: Zod + React Hook Form
- **UI Components**: Radix UI + shadcn/ui

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- MySQL 8+ instalado
- Conta Stripe (modo teste ou produção)
- Conta Resend para envio de e-mails

### Passo 1: Clone o Repositório

```bash
git clone <seu-repositorio>
cd every
```

### Passo 2: Instale as Dependências

```bash
npm install
```

### Passo 3: Configure as Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/evermoment"

# Stripe (obtenha em https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Product IDs (criar produtos no dashboard)
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...

# Email (obtenha em https://resend.com/api-keys)
RESEND_API_KEY=re_...
EMAIL_FROM=contato@evermoment.com.br

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Passo 4: Configure o Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Criar banco de dados e tabelas
npx prisma db push

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

### Passo 5: Configure os Produtos no Stripe

1. Acesse o [Dashboard Stripe](https://dashboard.stripe.com/products)
2. Crie dois produtos:
   - **Básico**: R$ 29,90 (ou 2990 centavos)
   - **Premium**: R$ 49,90 (ou 4990 centavos)
3. Copie os IDs dos preços (começam com `price_`) e cole no `.env`

### Passo 6: Configure o Webhook do Stripe

Para desenvolvimento local, use o Stripe CLI:

```bash
# Instalar Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe
# Linux: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Escutar webhooks localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copie o webhook secret (`whsec_...`) e adicione ao `.env`.

### Passo 7: Rode o Projeto

```bash
npm run dev
```

Acesse http://localhost:3000

## 🚀 Deploy na Hostinger

### Opção 1: Hostinger Node.js Hosting

1. **Criar Banco de Dados MySQL**
   - Acesse o painel da Hostinger
   - Vá em "Bancos de Dados MySQL"
   - Crie um novo banco chamado `evermoment`
   - Anote as credenciais

2. **Configurar Aplicação Node.js**
   - No painel, vá em "Node.js"
   - Crie nova aplicação
   - Versão do Node: 18 ou superior
   - Diretório: `/public_html/evermoment`

3. **Upload dos Arquivos**
   - Faça build local: `npm run build`
   - Upload via FTP ou Git:
     - `.next/`
     - `node_modules/`
     - `public/`
     - `package.json`
     - `next.config.js`
     - `prisma/`

4. **Configurar Variáveis de Ambiente**
   - No painel Node.js, adicione as variáveis do `.env`
   - Use a URL do banco MySQL da Hostinger

5. **Executar Migrations**
   ```bash
   npx prisma migrate deploy
   ```

6. **Configurar Webhook Stripe**
   - URL: `https://evermoment.com.br/api/webhooks/stripe`
   - Eventos: `checkout.session.completed`

### Opção 2: Vercel (Recomendado - Mais Fácil)

1. **Deploy na Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configurar Variáveis de Ambiente**
   - No dashboard Vercel, adicione todas as variáveis do `.env`
   - Use o banco MySQL da Hostinger

3. **Configurar Webhook**
   - URL: `https://seu-dominio.vercel.app/api/webhooks/stripe`

## 📝 Uso

### Criar um Convite

1. Acesse a página inicial
2. Clique em "Criar Meu Convite"
3. Escolha o tipo de evento e plano
4. Preencha os dados do evento
5. Faça o pagamento via Stripe
6. Receba o convite e QR Code por e-mail

### Compartilhar Convite

- **Link direto**: `https://evermoment.com.br/i/abc123`
- **QR Code**: Imprima e distribua em cartões físicos
- **WhatsApp**: Compartilhe o link diretamente

### Acompanhar RSVPs

Os convidados podem confirmar presença diretamente no convite. As confirmações são contabilizadas automaticamente.

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Verificar tipos TypeScript
npm run type-check

# Prisma Studio (visualizar banco)
npx prisma studio

# Gerar Prisma Client
npx prisma generate

# Aplicar migrations
npx prisma migrate deploy
```

## 📚 Estrutura do Projeto

```
every/
├── app/
│   ├── page.tsx              # Landing page
│   ├── criar/page.tsx        # Formulário de criação
│   ├── sucesso/page.tsx      # Página de sucesso
│   ├── i/[id]/page.tsx       # Visualização do convite
│   └── api/
│       ├── checkout/         # Criar sessão Stripe
│       ├── webhooks/stripe/  # Processar pagamentos
│       └── rsvp/[id]/        # Confirmar presença
├── components/
│   ├── InvitationView.tsx    # Componente do convite
│   └── ui/                   # Componentes UI reutilizáveis
├── lib/
│   ├── prisma.ts             # Cliente Prisma
│   ├── validations.ts        # Schemas Zod
│   ├── qrcode.ts             # Geração de QR Code
│   └── utils.ts              # Utilitários
└── prisma/
    └── schema.prisma         # Schema do banco
```

## 🎨 Planos e Preços

### Básico - R$ 29,90
- Convite digital personalizado
- QR Code exclusivo
- 1 template à escolha
- Contador regressivo
- Confirmação de presença (RSVP)
- Válido por 6 meses

### Premium - R$ 49,90
- Tudo do plano Básico
- Múltiplos templates
- Galeria de fotos (até 10)
- Música de fundo personalizada
- Mensagem customizada
- Válido por 1 ano
- Suporte prioritário

## 🐛 Troubleshooting

### Erro ao conectar no banco de dados
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Teste a conexão: `npx prisma db push`

### Webhook não está funcionando
- Verifique se o `STRIPE_WEBHOOK_SECRET` está correto
- Use `stripe listen` para desenvolvimento local
- Em produção, configure o endpoint no dashboard Stripe

### E-mails não estão sendo enviados
- Verifique a API key do Resend
- Confirme o domínio verificado no Resend
- Cheque os logs do webhook

## 📄 Licença

Este projeto é privado e proprietário.

## 🤝 Suporte

Para suporte, entre em contato via contato@evermoment.com.br

---

Feito com ❤️ por EverMoment
