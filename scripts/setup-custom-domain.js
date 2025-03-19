#!/usr/bin/env node

/**
 * Custom Domain Setup Script for LegalFriend.ai
 * 
 * This script helps set up the custom domain for the Supabase project.
 * It requires the Supabase CLI to be installed and authenticated.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
let projectRef = '';
let customDomain = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('SUPABASE_PROJECT_REF=')) {
      projectRef = line.split('=')[1].trim();
    }
    if (line.startsWith('CUSTOM_DOMAIN=')) {
      customDomain = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.error('Error reading .env file:', error.message);
  process.exit(1);
}

if (!projectRef) {
  console.error('SUPABASE_PROJECT_REF not found in .env file');
  process.exit(1);
}

if (!customDomain) {
  console.error('CUSTOM_DOMAIN not found in .env file');
  process.exit(1);
}

console.log(`
========================================
LegalFriend.ai Custom Domain Setup
========================================

This script will help you set up the custom domain for your Supabase project.
Before proceeding, make sure you have:

1. Registered the domain legalfriend.ai
2. Added a CNAME record for ${customDomain} pointing to ${projectRef}.supabase.co
3. Installed the Supabase CLI and authenticated

Project Reference: ${projectRef}
Custom Domain: ${customDomain}

`);

rl.question('Have you completed the prerequisites? (y/n): ', (answer) => {
  if (answer.toLowerCase() !== 'y') {
    console.log('Please complete the prerequisites before running this script.');
    rl.close();
    return;
  }

  console.log('\nChecking Supabase CLI installation...');
  try {
    execSync('supabase --version', { stdio: 'inherit' });
  } catch (error) {
    console.error('Supabase CLI not found. Please install it first.');
    rl.close();
    return;
  }

  console.log('\nActivating custom domain...');
  try {
    execSync(`supabase domains activate --project-ref ${projectRef}`, { stdio: 'inherit' });
    console.log('\n✅ Custom domain activated successfully!');
    
    console.log(`
Next steps:
1. Update your OAuth providers to use the new domain
2. Test your application with the new domain
3. Update any external services that interact with your Supabase project

Your application should now be accessible at:
- Frontend: https://legalfriend.ai
- API: https://${customDomain}
    `);
  } catch (error) {
    console.error('Error activating custom domain:', error.message);
    console.log(`
Troubleshooting:
1. Make sure your DNS records are properly configured
2. Verify that your Supabase project is on a paid plan
3. Check that you have Owner or Admin permissions for the project
4. Run 'supabase login' to authenticate with your Supabase account
    `);
  }

  rl.close();
});
