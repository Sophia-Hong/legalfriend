# LegalFriend.ai Domain Setup Checklist

Use this checklist to ensure you've properly configured your legalfriend.ai domain.

## DNS Configuration

- [ ] Register legalfriend.ai domain (COMPLETED)
- [ ] Set up CNAME record for api.legalfriend.ai pointing to sdomutarzwghclxpffte.supabase.co
- [ ] Set up A record for legalfriend.ai pointing to your hosting provider's IP
- [ ] Set up CNAME record for www.legalfriend.ai (optional)
- [ ] Verify DNS propagation using [DNSChecker](https://dnschecker.org/)

## Supabase Custom Domain

- [ ] Ensure your Supabase project is on a paid plan
- [ ] Run the domain setup script:
  ```
  npm run setup-domain
  ```
- [ ] Verify the custom domain is active in Supabase dashboard
- [ ] Test the API endpoint: https://api.legalfriend.ai/rest/v1/

## SSL Configuration

- [ ] Verify SSL is working for api.legalfriend.ai
- [ ] Set up SSL for legalfriend.ai through your hosting provider
- [ ] Test both domains with [SSL Labs](https://www.ssllabs.com/ssltest/)
- [ ] Configure your web server to force HTTPS

## Google Authentication

- [ ] Create a Google Cloud project
- [ ] Configure OAuth consent screen
- [ ] Create OAuth credentials with correct redirect URIs:
  - https://api.legalfriend.ai/auth/v1/callback
  - http://localhost:5173/auth/callback (for development)
- [ ] Configure Google provider in Supabase Authentication settings
- [ ] Test Google sign-in functionality

## Application Configuration

- [ ] Update environment variables in production:
  - VITE_SUPABASE_URL=https://api.legalfriend.ai
  - FRONTEND_URL=https://legalfriend.ai
- [ ] Deploy application with updated configuration
- [ ] Test authentication flow with the new domain
- [ ] Test file uploads and other functionality

## Post-Deployment Verification

- [ ] Verify all pages load correctly on the new domain
- [ ] Test user registration and login
- [ ] Test document upload and analysis
- [ ] Test payment processing
- [ ] Verify admin dashboard functionality

## Security Checks

- [ ] Run security scan on both domains
- [ ] Verify CORS settings in Supabase
- [ ] Check for mixed content warnings
- [ ] Verify proper HTTP security headers

## Monitoring Setup

- [ ] Set up uptime monitoring for both domains
- [ ] Configure error logging
- [ ] Set up SSL certificate expiration alerts
- [ ] Test error reporting

## Documentation

- [ ] Update documentation with new domain information
- [ ] Document the domain setup process for future reference
- [ ] Update API documentation with new endpoints

## Final Steps

- [ ] Announce the new domain to users (if applicable)
- [ ] Set up redirects from old domains (if applicable)
- [ ] Monitor analytics and error logs for the first 48 hours
