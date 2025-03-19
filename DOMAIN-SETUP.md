# LegalFriend.ai Domain Setup Guide

This guide provides step-by-step instructions for setting up the legalfriend.ai domain for your application.

## Prerequisites

Before you begin, make sure you have:

1. Registered the legalfriend.ai domain with a domain registrar (e.g., Namecheap, GoDaddy)
2. A Supabase project on a paid plan (Pro, Team, or Enterprise)
3. Owner or Admin permissions for the Supabase project
4. Installed the [Supabase CLI](https://supabase.com/docs/guides/resources/supabase-cli)

## Step 1: Register the Domain

1. Purchase the legalfriend.ai domain from a domain registrar
   - .ai domains are premium TLDs and typically cost around $70-100 per year
   - Most registrars require a minimum 2-year registration for .ai domains

## Step 2: Configure DNS Records

1. In your domain registrar's DNS settings, add the following CNAME record:
   - Type: CNAME
   - Host/Name: api
   - Value/Target: YOUR_PROJECT_REF.supabase.co (replace with your actual project reference)
   - TTL: 3600 (or lower for faster propagation)

2. Optionally, add an A record for the root domain:
   - Type: A
   - Host/Name: @
   - Value/Target: IP address of your frontend hosting (e.g., Vercel, Netlify)
   - TTL: 3600

## Step 3: Run the Setup Script

We've provided a script to help you activate the custom domain with Supabase:

```bash
npm run setup-domain
```

This script will:
1. Check if you have the Supabase CLI installed
2. Verify your project reference and custom domain from the .env file
3. Activate the custom domain for your Supabase project

## Step 4: Update OAuth Providers (if applicable)

If you're using OAuth providers for authentication:

1. Update the redirect URIs in each OAuth provider's dashboard
2. Use the new domain (https://api.legalfriend.ai) instead of the default Supabase domain

## Step 5: Verify the Setup

1. Wait for DNS propagation (can take up to 48 hours, but usually much faster)
2. Test your application using the new domain:
   - Frontend: https://legalfriend.ai
   - API: https://api.legalfriend.ai

## Troubleshooting

If you encounter issues:

1. Verify DNS propagation using a tool like [dnschecker.org](https://dnschecker.org)
2. Check that your Supabase project is on a paid plan
3. Ensure you have the correct permissions for the project
4. Check the Supabase dashboard for any error messages
5. Run `supabase domains list --project-ref YOUR_PROJECT_REF` to check domain status

## Additional Resources

- [Supabase Custom Domains Documentation](https://supabase.com/docs/guides/platform/custom-domains)
- [DNS Propagation Checker](https://dnschecker.org)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli)
