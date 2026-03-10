# 🚀 Professional Portfolio Deployment Guide

## Deployment Options

### Option 1: Deploy to Railway (Recommended)

Railway is perfect for Node.js backends. Configuration is already set up in `railway.json`.

#### Step 1: Connect GitHub Repository

1. Go to [Railway.app](https://railway.app)
2. Sign in with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your portfolio repository

#### Step 2: Configure Environment Variables

In Railway dashboard:

1. Go to your project
2. Click "Add Variable"
3. Add these variables:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=production
   PORT=3000
   ```

#### Step 3: Deploy

Railway automatically deploys when you push to GitHub.

**Your live site**: `https://portfolio-xxxx.railway.app`

---

### Option 2: Deploy Banking App to Vercel

Vercel is optimized for Next.js applications.

#### Step 1: Deploy Banking App

1. Go to [Vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select `banking-app` as the root directory
5. Add environment variables if needed
6. Click "Deploy"

**Banking app live**: `https://secure-bank-xxx.vercel.app`

---

### Option 3: Traditional VPS Deployment

#### Step 1: SSH into Server

```bash
ssh root@your.server.ip
```

#### Step 2: Clone Repository

```bash
cd /var/www
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

#### Step 3: Install Dependencies

```bash
npm install --production
```

#### Step 4: Set Environment Variables

```bash
cp .env.example .env
# Edit .env with your settings
nano .env
```

#### Step 5: Setup PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start server.js --name "portfolio"
pm2 startup
pm2 save
```

#### Step 6: Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: Setup SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Option 4: Docker Deployment

#### Step 1: Create Dockerfile

Already included in your project.

#### Step 2: Build Docker Image

```bash
docker build -t portfolio-app .
```

#### Step 3: Run Container

```bash
docker run -p 3000:3000 \
  -e EMAIL_USER=your-email@gmail.com \
  -e EMAIL_PASS=your-password \
  -e NODE_ENV=production \
  --name portfolio \
  --restart unless-stopped \
  portfolio-app
```

#### Step 4: Deploy to Cloud Services

**AWS ECS**:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
docker tag portfolio-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/portfolio-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/portfolio-app:latest
```

**DigitalOcean App Platform**:

- Push Docker image to DockerHub
- Connect DigitalOcean App Platform to DockerHub
- Deploy directly

---

## 📊 Performance Optimization

### Image Optimization

```bash
# Install imagemin CLI
npm install -g imagemin-cli

# Optimize images
imagemin images/* --out-dir=images
```

### CSS & JS Minification

```bash
# Install tools
npm install --save-dev cssnano terser

# Minify CSS
postcss style.css -o style.min.css

# Minify JS
terser server.js -o server.min.js
```

### Enable Gzip Compression

Already configured in `server.js`:

```javascript
app.use(compression());
```

---

## 🔒 Security Configuration

### SSL/TLS Certificate

- **Railway**: Auto-configured
- **Vercel**: Auto-configured
- **Self-hosted**: Use Let's Encrypt (certbot)

### Environment Variables

**Never commit `.env` file to GitHub!**

```bash
# .gitignore includes
.env
.env.local
.env.*.local
```

### Security Headers

Already configured in `server.js`:

```javascript
res.setHeader("X-Content-Type-Options", "nosniff");
res.setHeader("X-Frame-Options", "DENY");
res.setHeader("X-XSS-Protection", "1; mode=block");
```

---

## ✅ Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] `.env` file is in `.gitignore`
- [ ] No console errors or warnings
- [ ] Forms are tested
- [ ] Email service working
- [ ] Links are not broken
- [ ] Images optimized
- [ ] Mobile responsive verified
- [ ] Performance tested (< 3s load)
- [ ] SEO tags configured
- [ ] SSL certificate ready
- [ ] Domain DNS configured
- [ ] Backups configured
- [ ] Monitoring enabled

---

## 🔍 Post-Deployment Testing

### Test Endpoint

```bash
curl https://yourdomain.com/
```

### Test Contact Form

```bash
curl -X POST https://yourdomain.com/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### Performance Testing

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# Pingdom
# Visit https://tools.pingdom.com
```

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Email Not Sending

- Verify Gmail App Password is correct
- Check 2-factor authentication is enabled
- Verify email in `.env`
- Check Gmail "Less secure app access" settings

### Database Connection Error

- Verify DATABASE_URL is correct
- Check network access rules
- Verify credentials

### High Memory Usage

```bash
# Monitor with PM2
pm2 monit

# Restart if needed
pm2 restart portfolio
```

---

## 📈 Monitoring & Logging

### Railway Logs

```bash
railway logs
```

### PM2 Logs

```bash
pm2 logs portfolio
pm2 logs portfolio --lines 100 --err
```

### Docker Logs

```bash
docker logs portfolio
docker logs -f portfolio  # Follow logs
```

---

## 🔄 Updates & Maintenance

### Update Dependencies

```bash
npm outdated
npm update
npm audit fix
```

### Pull Latest Changes

```bash
cd /var/www/portfolio
git pull origin main
npm install
pm2 restart portfolio
```

---

## 📞 Support Resources

- **Railway Support**: https://railway.app/support
- **Vercel Docs**: https://vercel.com/docs
- **Let's Encrypt Docs**: https://letsencrypt.org/docs/
- **PM2 Guide**: https://pm2.keymetrics.io/docs

---

**Last Updated**: February 18, 2026
**Status**: Production Ready ✅

#### Step 2: Import to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects it's a Next.js app
5. Click Deploy

**Result:** Your app will be at:

```
https://banking-app-yourusername.vercel.app
```

---

### Option 3: Deploy to Heroku

1. Install Heroku CLI
2. Run:

```bash
heroku create banking-app-yourname
git push heroku main
```

---

## Update Your Portfolio Link

Once you have your deployment URL, update `index.html`:

```html
<a href="https://your-deployed-url.com" target="_blank">SecureBank</a>
```

Example:

```html
<a href="https://banking-app.railway.app" target="_blank">SecureBank</a>
```

---

## Testing Before Deployment

To test locally before deploying:

```bash
cd banking-app
npm run build
npm start
```

Then visit: `http://localhost:3000`

---

## Features Available on Live Deployment

✅ Complete authentication system (login/signup)
✅ Dashboard with 8 sections:

- About Us
- Cards Management
- Services
- Transfer/Withdraw
- Transaction History
- Support
- Profile
- Settings

✅ Real-time balance updates
✅ Transaction tracking
✅ Responsive design
✅ Bank-level security styling

---

## Recommended: Railway Deployment (Already Configured)

Since you have `railway.json` in your portfolio, Railway deployment is your easiest option:

1. **Connect GitHub to Railway**
   - Visit railway.app → New Project → Deploy from GitHub

2. **Select the portfolio repository**
   - Railway finds `railway.json` automatically

3. **Railway builds and deploys:**

   ```
   Build Command: npm install --production=false
   Start Command: npm start
   ```

4. **Get your live URL** from Railway dashboard

5. **Update portfolio link:**
   ```html
   <a href="https://your-railway-domain.railway.app" target="_blank"
     >SecureBank</a
   >
   ```

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

Your banking app is production-ready! Deploy it now! 🎉
