# DNS Configuration for LegalFriend.ai

This guide provides instructions for setting up the necessary DNS records for your legalfriend.ai domain.

## Required DNS Records

### 1. API Subdomain (for Supabase)

Add a CNAME record for the API subdomain:

| Type  | Host/Name | Value/Target                        | TTL    |
|-------|-----------|-------------------------------------|--------|
| CNAME | api       | sdomutarzwghclxpffte.supabase.co    | 3600   |

### 2. Root Domain (for your frontend)

Add an A record for the root domain:

| Type  | Host/Name | Value/Target                        | TTL    |
|-------|-----------|-------------------------------------|--------|
| A     | @         | [Your hosting provider's IP]        | 3600   |

### 3. WWW Subdomain (optional)

Add a CNAME record for the www subdomain:

| Type  | Host/Name | Value/Target                        | TTL    |
|-------|-----------|-------------------------------------|--------|
| CNAME | www       | legalfriend.ai                      | 3600   |

### 4. Email Configuration (MX Records)

If you plan to use email with your domain:

| Type  | Host/Name | Priority | Value/Target                        | TTL    |
|-------|-----------|----------|-------------------------------------|--------|
| MX    | @         | 10       | [Your email provider's MX server]   | 3600   |

### 5. TXT Records for Email Verification

For email deliverability and verification:

| Type  | Host/Name | Value/Target                                  | TTL    |
|-------|-----------|-----------------------------------------------|--------|
| TXT   | @         | v=spf1 include:[Your email provider] ~all     | 3600   |

### 6. SSL/TLS Configuration

Most domain registrars and hosting providers offer free SSL certificates through Let's Encrypt. Make sure SSL is enabled for both:

- https://legalfriend.ai
- https://api.legalfriend.ai

## Verifying DNS Propagation

After setting up your DNS records, you can verify propagation using:

- [DNSChecker](https://dnschecker.org/)
- [MXToolbox](https://mxtoolbox.com/)

DNS changes can take up to 48 hours to fully propagate, but typically complete within a few hours.

## Next Steps After DNS Setup

1. Run the domain setup script to activate the custom domain with Supabase:
   ```
   npm run setup-domain
   ```

2. Configure Google Auth in the Supabase dashboard
3. Test your application with the new domain
