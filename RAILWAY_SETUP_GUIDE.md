# 🚀 Guia de Deployment do Dockly no Railway

## Pré-requisitos

1. **Conta no Railway**: https://railway.app
2. **GitHub conectado ao Railway**
3. **Credenciais Manus** (VITE_APP_ID, API Keys, etc.)

## Passo 1: Criar Novo Projeto no Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub"**
4. Autorize o Railway a acessar seu GitHub
5. Selecione o repositório `dockly`

## Passo 2: Adicionar Banco de Dados MySQL

1. No dashboard do Railway, clique em **"Add Service"**
2. Selecione **"MySQL"**
3. Railway criará automaticamente a variável `DATABASE_URL`

## Passo 3: Configurar Variáveis de Ambiente

No Railway, vá para **"Variables"** e adicione:

### Variáveis Obrigatórias:

```
NODE_ENV=production
JWT_SECRET=<gere-uma-chave-segura>
VITE_APP_ID=<sua-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=<seu-owner-id>
OWNER_NAME=<seu-nome>
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=<sua-api-key>
VITE_FRONTEND_FORGE_API_KEY=<sua-frontend-key>
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_APP_TITLE=Dockly
```

### Variáveis Opcionais:

```
VITE_ANALYTICS_ENDPOINT=<seu-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<seu-website-id>
VITE_APP_LOGO=https://seu-logo-url.com/logo.png
AWS_ACCESS_KEY_ID=<sua-chave>
AWS_SECRET_ACCESS_KEY=<sua-chave-secreta>
AWS_REGION=us-east-1
AWS_S3_BUCKET=<seu-bucket>
```

## Passo 4: Deploy Automático

1. Railway detectará automaticamente o `railway.json`
2. Executará: `pnpm install && pnpm build`
3. Iniciará com: `pnpm start`
4. Seu app estará disponível em `https://<seu-projeto>.up.railway.app`

## Passo 5: Executar Migrações do Banco de Dados

Após o primeiro deploy bem-sucedido:

1. No dashboard do Railway, acesse o serviço do seu app
2. Vá para **"Deployments"** → **"Logs"**
3. Procure por mensagens de erro relacionadas ao banco de dados
4. Se necessário, execute as migrações manualmente:
   - Acesse o console do Railway
   - Execute: `pnpm db:push`

## Troubleshooting

### ❌ Erro: "Cannot connect to database"
- Verifique se a variável `DATABASE_URL` está configurada
- Confirme que o serviço MySQL está ativo
- Verifique os logs para mensagens de erro específicas

### ❌ Erro: "OAuth callback failed"
- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que a URL de callback está registrada em Manus
- Verifique se `JWT_SECRET` não está vazio

### ❌ Erro: "Build failed"
- Verifique os logs de build no Railway
- Confirme que todas as dependências estão listadas em `package.json`
- Tente limpar o cache: `pnpm store prune`

### ❌ Erro: "Port already in use"
- Railway atribui automaticamente a porta via `process.env.PORT`
- Confirme que o servidor escuta em `process.env.PORT || 3000`

## Monitoramento

1. Acesse **"Deployments"** para ver o histórico
2. Clique no deployment ativo para ver **"Logs"**
3. Use **"Metrics"** para monitorar CPU, memória e requisições

## Atualizações Futuras

Cada vez que você fizer `git push` para o repositório:
1. Railway detectará automaticamente as mudanças
2. Executará o build novamente
3. Fará deploy da nova versão

## Suporte

- 📚 [Documentação do Railway](https://docs.railway.app)
- 🤝 [Comunidade Railway](https://railway.app/community)
- 🆘 [Manus Support](https://help.manus.im)

---

**Última atualização**: 16 de Fevereiro de 2026
