# Complete Domain Setup Guide for LegalFriend.ai

Congratulations on purchasing the legalfriend.ai domain! This guide provides comprehensive instructions for setting up your domain with SSL, Google Authentication, and proper configuration for your application.

## Table of Contents

1. [DNS Configuration](#1-dns-configuration)
2. [Supabase Custom Domain Setup](#2-supabase-custom-domain-setup)
3. [SSL Configuration](#3-ssl-configuration)
4. [Google Authentication](#4-google-authentication)
5. [Application Configuration](#5-application-configuration)
6. [Testing and Verification](#6-testing-and-verification)
7. [Troubleshooting](#7-troubleshooting)

## 1. DNS Configuration

### Required DNS Records

| Type  | Host/Name | Value/Target                     | TTL    | Purpose                    |
|-------|-----------|----------------------------------|--------|----------------------------|
| CNAME | api       | sdomutarzwghclxpffte.supabase.co | 3600   | Supabase API custom domain |
| A     | @         | [Your hosting provider's IP]     | 3600   | Frontend application       |
| CNAME | www       | legalfriend.ai                   | 3600   | www subdomain (optional)   |

### Steps to Configure DNS

1. Log in to your domain registrar's dashboard (where you purchased legalfriend.ai)
2. Navigate to the DNS management section
3. Add the records as shown in the table above
4. Save your changes
5. Wait for DNS propagation (can take up to 48 hours, but usually much faster)

### Verify DNS Propagation

Use these tools to check if your DNS records have propagated:
- [DNSChecker](https://dnschecker.org/)
- [MXToolbox](https://mxtoolbox.com/DNSLookup.aspx)

## 2. Supabase Custom Domain Setup

### Prerequisites

- Supabase project on a paid plan
- DNS records properly configured
- Supabase CLI installed

### Steps to Activate Custom Domain

1. Ensure your `.env` file contains:
   ```
   SUPABASE_PROJECT_REF=sdomutarzwghclxpffte
   CUSTOM_DOMAIN=api.legalfriend.ai
   ```

2. Run the domain setup script:
   ```bash
   npm run setup-domain
   ```

3. Follow the prompts in the script
4. Verify activation in the Supabase dashboard:
   - Go to Project Settings > API
   - Check that the custom domain is listed and active

## 3. SSL Configuration

### SSL for Supabase Custom Domain

Supabase automatically handles SSL for your custom domain. After activation:

1. Wait a few minutes for the SSL certificate to be provisioned
2. Visit https://api.legalfriend.ai in your browser
3. Verify the connection is secure (look for the padlock icon)

### SSL for Frontend Domain

For your main domain (legalfriend.ai), SSL configuration depends on your hosting provider:

#### If using Vercel:

1. Add your domain in the Vercel dashboard
2. Vercel will automatically provision an SSL certificate

#### If using Netlify:

1. Add your domain in the Netlify dashboard
2. Netlify will automatically provision an SSL certificate

#### If using traditional hosting:

1. Install Certbot and obtain a Let's Encrypt certificate:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   sudo certbot --apache -d legalfriend.ai -d www.legalfriend.ai
   ```

2. Set up auto-renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

## 4. Google Authentication

### Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "LegalFriend"
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Configure the consent screen:
   - User Type: External
   - App Name: LegalFriend
   - User support email: your email
   - Developer contact information: your email

### Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: Web application
4. Name: LegalFriend Web Client
5. Add authorized JavaScript origins:
   ```
   https://legalfriend.ai
   https://api.legalfriend.ai
   http://localhost:5173
   ```
6. Add authorized redirect URIs:
   ```
   https://api.legalfriend.ai/auth/v1/callback
   http://localhost:5173/auth/callback
   ```
7. Note your Client ID and Client Secret

### Configure Supabase Authentication

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Providers
3. Find "Google" and enable it
4. Enter your Google Client ID and Client Secret
5. Save changes

## 5. Application Configuration

### Update Environment Variables

1. In your `.env` file, ensure these variables are set:
   ```
   VITE_SUPABASE_URL=https://api.legalfriend.ai
   VITE_SUPABASE_ANON_KEY=your_anon_key
   FRONTEND_URL=https://legalfriend.ai
   CUSTOM_DOMAIN=api.legalfriend.ai
   ```

2. For production deployment, update your build configuration to use the custom domain

### Update OAuth Redirect URLs

If you're using any other OAuth providers (besides Google), update their redirect URLs to use your custom domain.

## 6. Testing and Verification

### Test API Endpoints

1. Test the Supabase API endpoint:
   ```
   curl https://api.legalfriend.ai/rest/v1/
   ```

2. Test authentication:
   - Visit your application
   - Try signing in with Google
   - Verify the authentication flow works

### Test Application Functionality

1. Test document uploads
2. Test lease analysis
3. Test payment processing
4. Test admin dashboard

### Security Checks

1. Verify SSL is working correctly:
   - Use [SSL Labs](https://www.ssllabs.com/ssltest/) to test your SSL configuration
   - Check for mixed content warnings in your browser console

2. Check CORS settings in Supabase

## 7. Troubleshooting

### Common Issues and Solutions

#### DNS Issues

- **Problem**: Custom domain not resolving
- **Solution**: Verify DNS records are correct and have propagated

#### SSL Issues

- **Problem**: SSL certificate not working
- **Solution**: Ensure DNS is correctly configured and wait for certificate provisioning

#### Authentication Issues

- **Problem**: Google login not working
- **Solution**: Verify redirect URIs match exactly in both Google Cloud Console and Supabase

#### CORS Issues

- **Problem**: API requests failing with CORS errors
- **Solution**: Update CORS settings in Supabase to include your custom domain

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Visit the [Supabase community forum](https://github.com/supabase/supabase/discussions)
3. Contact Supabase support if you're on a paid plan

## Next Steps

After successfully setting up your domain:

1. Monitor your application for any issues
2. Set up monitoring and alerts
3. Consider implementing additional security measures
4. Update your documentation to reflect the new domain

Congratulations on setting up your custom domain for LegalFriend.ai!
