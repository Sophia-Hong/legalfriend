# SSL Configuration for LegalFriend.ai

This guide explains how to ensure SSL/TLS is properly configured for your legalfriend.ai domain.

## SSL for Supabase Custom Domain (api.legalfriend.ai)

When you set up a custom domain with Supabase, SSL is automatically configured for you. Supabase handles the SSL certificate provisioning and renewal through Let's Encrypt.

### Verifying Supabase SSL

1. After running the `setup-domain` script and configuring your DNS records, wait for DNS propagation
2. Visit https://api.legalfriend.ai in your browser
3. Check that the connection is secure (look for the padlock icon in your browser)

If there are issues with the SSL certificate, ensure:
- Your DNS CNAME record for api.legalfriend.ai is correctly pointing to your Supabase project URL
- Your Supabase project is on a paid plan (required for custom domains)
- You've properly activated the custom domain using the Supabase CLI

## SSL for Your Frontend Domain (legalfriend.ai)

For your main domain, SSL configuration depends on your hosting provider. Here are instructions for common hosting providers:

### Vercel

If you're hosting on Vercel:

1. Add your domain in the Vercel dashboard under your project settings
2. Vercel will automatically provision an SSL certificate via Let's Encrypt
3. Ensure your DNS A record points to Vercel's IP addresses

### Netlify

If you're hosting on Netlify:

1. Add your domain in the Netlify dashboard under domain settings
2. Netlify will automatically provision an SSL certificate via Let's Encrypt
3. Ensure your DNS A record points to Netlify's load balancer

### AWS Amplify

If you're using AWS Amplify:

1. Add your domain in the Amplify Console
2. AWS will provision an SSL certificate through Amazon Certificate Manager
3. Update your DNS records as instructed by AWS

### Traditional Hosting with Let's Encrypt

If you're using traditional hosting:

1. Install Certbot on your server:
   ```
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. Obtain a certificate:
   ```
   sudo certbot --apache -d legalfriend.ai -d www.legalfriend.ai
   ```
   
   Or for Nginx:
   ```
   sudo certbot --nginx -d legalfriend.ai -d www.legalfriend.ai
   ```

3. Set up auto-renewal:
   ```
   sudo certbot renew --dry-run
   ```

## Testing SSL Configuration

After setting up SSL, verify your configuration:

1. Use [SSL Labs](https://www.ssllabs.com/ssltest/) to test your SSL configuration
2. Check both domains:
   - https://legalfriend.ai
   - https://api.legalfriend.ai

3. Ensure you get at least an "A" rating

## Forcing HTTPS

To ensure all traffic uses HTTPS:

### For Frontend Applications

Add the following to your web server configuration:

**Apache (.htaccess):**
```
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Nginx:**
```
server {
    listen 80;
    server_name legalfriend.ai www.legalfriend.ai;
    return 301 https://$host$request_uri;
}
```

### For React Applications

If you're using React Router, ensure all routes use HTTPS:

```jsx
<BrowserRouter
  basename={window.location.protocol === 'https:' ? '/' : window.location.pathname}
>
  <Routes>
    {/* Your routes */}
  </Routes>
</BrowserRouter>
```

## Troubleshooting SSL Issues

If you encounter SSL issues:

1. **Certificate Not Trusted**: Ensure your certificate is from a trusted CA (Let's Encrypt is trusted by most browsers)
2. **Mixed Content Warnings**: Make sure all resources (images, scripts, etc.) are loaded over HTTPS
3. **Certificate Mismatch**: Verify the certificate is issued for the correct domain(s)
4. **Expiration**: Check that your certificate hasn't expired

## Additional Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [SSL Labs Testing Tool](https://www.ssllabs.com/ssltest/)
- [Supabase Custom Domains Documentation](https://supabase.com/docs/guides/platform/custom-domains)
