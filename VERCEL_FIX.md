# Guia Rápido: Resolver Erro de Build na Vercel

## Erro Atual
```
Error: Failed to collect page data for /api/checkout
```

## Causa
O Next.js está tentando fazer "static generation" das rotas API durante o build, mas o Prisma precisa de `DATABASE_URL` que pode não estar disponível.

## Solução Definitiva

### 1. Configure Variáveis de Ambiente na Vercel

**OBRIGATÓRIO** - Adicione estas variáveis em **Settings → Environment Variables**:

```env
# Database (MySQL de produção)
DATABASE_URL=mysql://user:password@host:3306/database

# Stripe (chaves LIVE, não test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...

# Email SMTP
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contato@evermoment.com.br
SMTP_PASS=sua_senha
EMAIL_FROM=EverMoment <contato@evermoment.com.br>

# App
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NODE_ENV=production
```

### 2. Redeploy

Após adicionar as variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. **Redeploy**

## Checklist

- [ ] `DATABASE_URL` configurada (banco MySQL de produção)
- [ ] Todas as chaves do Stripe configuradas (LIVE, não test)
- [ ] Credenciais SMTP configuradas
- [ ] `NEXT_PUBLIC_APP_URL` com domínio correto
- [ ] Redeploy realizado

## Se o Erro Persistir

O código já está configurado com:
- ✅ `runtime = 'nodejs'` em todas as rotas
- ✅ `dynamic = 'force-dynamic'` para evitar static generation
- ✅ Inicialização do Stripe dentro das funções (não no módulo)

**O problema é 100% falta de variáveis de ambiente na Vercel.**

---

**Importante**: Use chaves **LIVE** do Stripe em produção, não as de teste!
