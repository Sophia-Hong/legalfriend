# Setting Up Google Authentication for LegalFriend.ai

This guide walks you through setting up Google Authentication for your LegalFriend application.

## Prerequisites

1. A Google account with access to Google Cloud Console
2. Your domain (legalfriend.ai) properly configured with DNS records
3. Supabase project with custom domain activated

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Enter "LegalFriend" as the project name
5. Click "Create"

## Step 2: Configure OAuth Consent Screen

1. In your Google Cloud project, navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" as the user type (unless you have a Google Workspace organization)
3. Click "Create"
4. Fill in the required information:
   - App name: LegalFriend
   - User support email: your-email@example.com
   - Developer contact information: your-email@example.com
5. Click "Save and Continue"
6. Skip adding scopes by clicking "Save and Continue"
7. Add test users if needed (for development)
8. Click "Save and Continue"
9. Review your settings and click "Back to Dashboard"

## Step 3: Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: "LegalFriend Web Client"
5. Add authorized JavaScript origins:
   - https://legalfriend.ai
   - https://api.legalfriend.ai
   - http://localhost:5173 (for development)
6. Add authorized redirect URIs:
   - https://api.legalfriend.ai/auth/v1/callback
   - http://localhost:5173/auth/callback (for development)
7. Click "Create"
8. Note your Client ID and Client Secret (you'll need these for Supabase)

## Step 4: Configure Supabase Authentication

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Authentication" > "Providers"
4. Find "Google" in the list and click "Edit"
5. Toggle "Enable Google OAuth" to ON
6. Enter your Google Client ID and Client Secret
7. Save changes

## Step 5: Update Your Application Code

Ensure your application is using the correct redirect URLs:

```typescript
// For production
const supabaseUrl = 'https://api.legalfriend.ai';
const supabaseAnonKey = 'your-anon-key';

// For development
// const supabaseUrl = 'http://localhost:5173';
// const supabaseAnonKey = 'your-local-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 6: Test Google Authentication

1. Deploy your application to production
2. Navigate to your login page
3. Click the "Sign in with Google" button
4. You should be redirected to Google's authentication page
5. After authenticating, you should be redirected back to your application

## Troubleshooting

If you encounter issues:

1. **Redirect URI Mismatch**: Ensure the redirect URIs in Google Cloud Console exactly match those in your Supabase configuration
2. **CORS Issues**: Check that your authorized JavaScript origins include all domains your app runs on
3. **Custom Domain Not Working**: Verify your DNS settings and that the custom domain is properly activated in Supabase

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
