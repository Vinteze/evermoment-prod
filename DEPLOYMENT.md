# 🚀 Guia de Deploy - EverMoment

Este guia detalha como fazer o deploy da aplicação EverMoment na Hostinger ou Vercel.

## 📋 Pré-requisitos

- [ ] Conta Stripe configurada (modo produção)
- [ ] Conta Resend com domínio verificado
- [ ] Banco de dados MySQL configurado
- [ ] Domínio evermoment.com.br apontado

## 🌐 Opção 1: Deploy na Hostinger (Node.js)

### Passo 1: Preparar o Banco de Dados

1. Acesse o painel da Hostinger
2. Vá em **Bancos de Dados MySQL**
3. Clique em **Criar Novo Banco**
4. Nome do banco: `evermoment`
5. Anote as credenciais:
   - Host: `localhost` ou IP fornecido
   - Usuário: fornecido pela Hostinger
   - Senha: fornecida pela Hostinger
   - Porta: `3306`

### Passo 2: Configurar Aplicação Node.js

1. No painel Hostinger, vá em **Node.js**
2. Clique em **Criar Aplicação**
3. Configurações:
   - **Versão do Node**: 18.x ou superior
   - **Modo da aplicação**: Produção
   - **Diretório raiz**: `/public_html/evermoment`
   - **Arquivo de entrada**: `server.js` (vamos criar)

### Passo 3: Preparar Build Local

No seu computador, execute:

```bash
# Instalar dependências
npm install

# Fazer build de produção
npm run build

# Gerar Prisma Client
npx prisma generate
```

### Passo 4: Upload dos Arquivos

Via FTP ou File Manager da Hostinger, faça upload de:

```
evermoment/
├── .next/              # Build do Next.js
├── node_modules/       # Dependências (ou instale no servidor)
├── public/             # Arquivos estáticos
├── prisma/             # Schema Prisma
├── package.json
├── package-lock.json
├── next.config.js
├── tsconfig.json
└── server.js           # Criar este arquivo (veja abaixo)
```

**Criar `server.js`:**

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Passo 5: Instalar Dependências no Servidor

Via SSH ou terminal do painel:

```bash
cd /public_html/evermoment
npm install --production
```

### Passo 6: Configurar Variáveis de Ambiente

No painel Node.js da Hostinger, adicione as variáveis:

```env
DATABASE_URL=mysql://usuario:senha@localhost:3306/evermoment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
RESEND_API_KEY=re_...
EMAIL_FROM=contato@evermoment.com.br
NEXT_PUBLIC_APP_URL=https://evermoment.com.br
NODE_ENV=production
```

### Passo 7: Executar Migrations

Via SSH:

```bash
cd /public_html/evermoment
npx prisma migrate deploy
```

### Passo 8: Configurar Webhook Stripe

1. Acesse [Dashboard Stripe → Webhooks](https://dashboard.stripe.com/webhooks)
2. Clique em **Adicionar Endpoint**
3. URL: `https://evermoment.com.br/api/webhooks/stripe`
4. Eventos para escutar:
   - `checkout.session.completed`
5. Copie o **Signing Secret** e atualize `STRIPE_WEBHOOK_SECRET`

### Passo 9: Iniciar Aplicação

No painel Node.js, clique em **Reiniciar Aplicação**.

Acesse: https://evermoment.com.br

---

## ☁️ Opção 2: Deploy na Vercel (Recomendado)

### Vantagens da Vercel
- ✅ Deploy automático via Git
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Rollback fácil
- ✅ Preview de branches
- ✅ Mais fácil de configurar

### Passo 1: Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **New Project**
3. Importe seu repositório Git
4. Framework Preset: **Next.js**

### Passo 2: Configurar Variáveis de Ambiente

Na aba **Environment Variables**, adicione:

```env
DATABASE_URL=mysql://usuario:senha@host-mysql-hostinger:3306/evermoment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
RESEND_API_KEY=re_...
EMAIL_FROM=contato@evermoment.com.br
NEXT_PUBLIC_APP_URL=https://evermoment.com.br
NODE_ENV=production
```

**Importante**: Use o host MySQL externo da Hostinger (não `localhost`).

### Passo 3: Configurar Build

Adicione ao `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### Passo 4: Deploy

Clique em **Deploy**. A Vercel vai:
1. Instalar dependências
2. Gerar Prisma Client
3. Fazer build do Next.js
4. Fazer deploy

### Passo 5: Configurar Domínio

1. Na aba **Settings → Domains**
2. Adicione `evermoment.com.br`
3. Configure os DNS no registrador:
   - Tipo: `CNAME`
   - Nome: `@` ou `www`
   - Valor: `cname.vercel-dns.com`

### Passo 6: Executar Migrations

Via terminal local:

```bash
# Conectar ao banco de produção
DATABASE_URL="mysql://..." npx prisma migrate deploy
```

Ou via Vercel CLI:

```bash
vercel env pull .env.production
npx prisma migrate deploy
```

### Passo 7: Configurar Webhook Stripe

1. Dashboard Stripe → Webhooks
2. URL: `https://evermoment.com.br/api/webhooks/stripe`
3. Evento: `checkout.session.completed`

---

## 🧪 Testar em Produção

### 1. Teste de Pagamento

Use cartões de teste do Stripe:
- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- Qualquer data futura e CVC

### 2. Verificar Webhook

1. Faça um pagamento de teste
2. Verifique logs no Stripe Dashboard
3. Confirme recebimento de e-mail
4. Acesse o convite via link

### 3. Testar RSVP

1. Acesse um convite criado
2. Confirme presença
3. Verifique se o contador aumentou

---

## 🔧 Manutenção

### Atualizar Código

**Hostinger:**
```bash
# Fazer build local
npm run build

# Upload via FTP
# Reiniciar aplicação no painel
```

**Vercel:**
```bash
git push origin main
# Deploy automático
```

### Backup do Banco

```bash
# Exportar
mysqldump -u usuario -p evermoment > backup.sql

# Importar
mysql -u usuario -p evermoment < backup.sql
```

### Monitorar Logs

**Hostinger**: Painel Node.js → Logs

**Vercel**: Dashboard → Deployments → Logs

---

## ❗ Troubleshooting

### Erro de Conexão com Banco

- Verifique se o IP da Vercel/Hostinger está permitido no MySQL
- Confirme credenciais no `.env`
- Teste conexão: `npx prisma db push`

### Webhook Retornando 500

- Verifique se `STRIPE_WEBHOOK_SECRET` está correto
- Confirme que a rota `/api/webhooks/stripe` está acessível
- Cheque logs de erro

### E-mails Não Enviados

- Verifique domínio verificado no Resend
- Confirme `RESEND_API_KEY`
- Cheque limites de envio

### Build Falhando

- Limpe cache: `rm -rf .next`
- Reinstale: `rm -rf node_modules && npm install`
- Verifique versão do Node: `node -v` (deve ser 18+)

---

## 📊 Monitoramento

### Métricas Importantes

- Taxa de conversão (visitantes → pagamentos)
- Tempo médio de criação de convite
- Taxa de RSVP
- Erros de webhook

### Ferramentas Recomendadas

- **Uptime**: UptimeRobot
- **Analytics**: Google Analytics
- **Errors**: Sentry
- **Logs**: Vercel Analytics ou Hostinger Logs

---

## 🔐 Segurança

### Checklist de Produção

- [ ] HTTPS habilitado
- [ ] Variáveis de ambiente seguras (não commitadas)
- [ ] Stripe em modo produção
- [ ] Webhook signature validation ativa
- [ ] Rate limiting configurado
- [ ] Backup automático do banco
- [ ] Domínio com SSL válido

---

## 📞 Suporte

Para problemas de deploy, entre em contato:
- E-mail: contato@evermoment.com.br
- Documentação Stripe: https://stripe.com/docs
- Documentação Vercel: https://vercel.com/docs
- Documentação Hostinger: https://support.hostinger.com

---

Feito com ❤️ por EverMoment
