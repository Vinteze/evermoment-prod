# Guia de Deploy na Vercel

## Erro: Failed to collect page data for /api/checkout

Este erro acontece porque as **variáveis de ambiente** não estão configuradas na Vercel.

## Solução: Configurar Variáveis de Ambiente

### 1. Acesse o Dashboard da Vercel
- Vá para: https://vercel.com/dashboard
- Selecione seu projeto **evermoment**
- Clique em **Settings** → **Environment Variables**

### 2. Adicione as Variáveis Obrigatórias

Adicione cada uma destas variáveis:

```env
# Database
DATABASE_URL=mysql://user:password@host:3306/database_name

# Stripe (obtenha em https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Products (crie em https://dashboard.stripe.com/products)
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...

# Email SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contato@evermoment.com.br
SMTP_PASS=sua_senha_email
EMAIL_FROM=EverMoment <contato@evermoment.com.br>

# App
NEXT_PUBLIC_APP_URL=https://evermoment.vercel.app
NODE_ENV=production
```

### 3. Importante sobre o Stripe

**Para produção, use as chaves LIVE (não test):**
- `pk_live_...` (não `pk_test_...`)
- `sk_live_...` (não `sk_test_...`)

**Configure o Webhook na Vercel:**
1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique em **Add endpoint**
3. URL: `https://evermoment.vercel.app/api/webhooks/stripe`
4. Eventos: Selecione `checkout.session.completed`
5. Copie o **Signing secret** (`whsec_...`)
6. Adicione como `STRIPE_WEBHOOK_SECRET` na Vercel

### 4. Redeploy

Após adicionar todas as variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**

## Checklist de Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] DATABASE_URL apontando para banco MySQL de produção
- [ ] Stripe usando chaves LIVE (não test)
- [ ] Webhook do Stripe configurado
- [ ] NEXT_PUBLIC_APP_URL com domínio correto
- [ ] SMTP configurado com credenciais da Hostinger
- [ ] Redeploy realizado

## Testando em Produção

Após o deploy:
1. Acesse: https://evermoment.vercel.app
2. Crie um convite de teste
3. Use cartão de teste do Stripe: `4242 4242 4242 4242`
4. Verifique se o e-mail chegou
5. Acesse o link do convite

## Troubleshooting

**Erro persiste?**
- Verifique os logs na Vercel: **Deployments** → **View Function Logs**
- Confirme que todas as variáveis estão corretas
- Teste a conexão com o banco de dados

**E-mails não chegam?**
- Verifique as credenciais SMTP
- Confirme que o domínio está verificado na Hostinger
- Teste enviando um e-mail manualmente

---

**Dica**: Mantenha as variáveis de ambiente sincronizadas entre `.env` local e Vercel!
