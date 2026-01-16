# Railway Deployment Guide

## Příprava

1. **Vytvořte účet na Railway**
   - Jděte na https://railway.app
   - Přihlaste se přes GitHub

2. **Nainstalujte Railway CLI** (volitelné)
   ```bash
   npm install -g @railway/cli
   ```

## Deployment přes Railway Dashboard (Doporučeno)

### Krok 1: Vytvoření nového projektu

1. Přihlaste se na https://railway.app
2. Klikněte na "New Project"
3. Vyberte "Deploy from GitHub repo"
4. Autorizujte Railway přístup k vašemu GitHub účtu
5. Vyberte repozitář `marelhott/mulen-node-banana`

### Krok 2: Konfigurace Environment Variables

V Railway dashboardu přidejte tyto proměnné:

**Povinné:**
```
GEMINI_API_KEY=your_actual_gemini_api_key
NODE_ENV=production
```

**Volitelné (pro multi-provider support):**
```
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_KEY=your_replicate_api_key
FAL_API_KEY=your_fal_api_key
```

### Krok 3: Deployment Settings

Railway automaticky detekuje:
- ✅ Build command: `npm install && npm run build`
- ✅ Start command: `node server.js`
- ✅ Port: 3000 (z server.js)

Pokud ne, nastavte manuálně v Settings → Deploy.

### Krok 4: Deploy

1. Railway automaticky spustí první deployment
2. Sledujte build logs v dashboardu
3. Po dokončení získáte URL (např. `your-app.up.railway.app`)

## Deployment přes Railway CLI

```bash
# 1. Přihlášení
railway login

# 2. Inicializace projektu
railway init

# 3. Link k existujícímu projektu (pokud už existuje)
# railway link

# 4. Nastavení environment variables
railway variables set GEMINI_API_KEY=your_key
railway variables set NODE_ENV=production

# 5. Deploy
railway up
```

## Konfigurace Custom Domain (Volitelné)

1. V Railway dashboardu jděte do Settings → Domains
2. Klikněte "Add Domain"
3. Zadejte vaši doménu (např. `node-banana.yourdomain.com`)
4. Přidejte CNAME záznam u vašeho DNS providera:
   ```
   CNAME node-banana -> your-app.up.railway.app
   ```

## Monitoring a Logs

- **Logs**: Railway Dashboard → Deployments → View Logs
- **Metrics**: Dashboard zobrazuje CPU, RAM, Network usage
- **Alerts**: Nastavte v Settings → Notifications

## Troubleshooting

### Build selhává

1. Zkontrolujte build logs v Railway dashboardu
2. Ověřte, že všechny dependencies jsou v `package.json`
3. Zkuste rebuild: Settings → Redeploy

### Aplikace nereaguje

1. Zkontrolujte, že `PORT` environment variable není nastavena (server.js používá 3000)
2. Ověřte logs pro chyby
3. Zkontrolujte, že GEMINI_API_KEY je správně nastavený

### Timeout při video generování

Railway podporuje dlouhé requesty, ale:
- Zkontrolujte Railway plan limits
- Pro video generování může být potřeba vyšší tier

## Ceny

Railway nabízí:
- **Free tier**: $5 credit měsíčně (cca 500 hodin běhu)
- **Hobby**: $5/měsíc + usage
- **Pro**: $20/měsíc + usage

Pro development/testing je free tier dostačující.

## Automatické Deploymenty

Railway automaticky deployuje při každém push na GitHub:
- Push na `master` → automatický deployment
- Můžete nastavit i preview deployments pro PR

## Rollback

Pokud něco selže:
1. Jděte do Deployments
2. Najděte předchozí úspěšný deployment
3. Klikněte "Redeploy"

## Další kroky

Po úspěšném deploymentu:
1. ✅ Otestujte aplikaci na Railway URL
2. ✅ Nastavte custom domain (volitelné)
3. ✅ Nakonfigurujte monitoring alerts
4. ✅ Přidejte všechny potřebné API klíče

---

**Poznámka**: Railway je ideální pro tento projekt, protože:
- ✅ Podporuje custom Node.js server
- ✅ Žádné timeout limity jako Netlify
- ✅ Automatické HTTPS
- ✅ Snadná integrace s GitHub
- ✅ Dobré ceny
