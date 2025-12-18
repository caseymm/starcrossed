# Deployment Instructions

This project deploys entirely to **Vercel** (both React app and proxy API).

## Deploy to Vercel (One Command!)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

That's it! Vercel will:
- Build your React app
- Host the static files
- Deploy the `/api/proxy` serverless function
- Give you a URL like: `https://starcrossed.vercel.app`

## Local Development

Run the Vercel dev server (handles both React app and API):

```bash
vercel dev
```

This will start:
- React app on `localhost:3000`
- API functions at `localhost:3000/api/proxy`

## Alternative: GitHub Pages (More Complex)

If you prefer GitHub Pages for the frontend:

1. Deploy proxy to Vercel: `vercel`
2. Update `.env`: `REACT_APP_PROXY_URL=https://your-project.vercel.app/api/proxy`
3. Deploy app: `npm run deploy`

But honestly, just using Vercel for everything is easier! 🚀
