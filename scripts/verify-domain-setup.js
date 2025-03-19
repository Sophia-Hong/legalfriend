#!/usr/bin/env node

/**
 * Domain Setup Verification Script for LegalFriend.ai
 * 
 * This script verifies that the custom domain is properly configured.
 */

import fetch from 'node-fetch';
import dns from 'dns';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify DNS functions
const resolveCname = promisify(dns.resolveCname);
const resolve4 = promisify(dns.resolve4);

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
let customDomain = '';
let frontendUrl = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('CUSTOM_DOMAIN=')) {
      customDomain = line.split('=')[1].trim();
    }
    if (line.startsWith('FRONTEND_URL=')) {
      frontendUrl = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.error('Error reading .env file:', error.message);
  process.exit(1);
}

if (!customDomain) {
  console.error('CUSTOM_DOMAIN not found in .env file');
  process.exit(1);
}

if (!frontendUrl) {
  console.error('FRONTEND_URL not found in .env file');
  process.exit(1);
}

// Extract domain from frontend URL
const frontendDomain = frontendUrl.replace(/^https?:\/\//, '');

console.log(`
========================================
LegalFriend.ai Domain Verification
========================================

This script will verify that your custom domain is properly configured.

Frontend URL: ${frontendUrl}
API Domain: ${customDomain}

`);

// Check DNS configuration
async function checkDns() {
  console.log('Checking DNS configuration...');
  
  try {
    // Check CNAME record for API subdomain
    const cnameRecords = await resolveCname(customDomain);
    console.log(`✅ CNAME record for ${customDomain} found: ${cnameRecords.join(', ')}`);
  } catch (error) {
    console.error(`❌ CNAME record for ${customDomain} not found or not propagated yet.`);
    console.log('   This might be because:');
    console.log('   1. You haven\'t set up the DNS record yet');
    console.log('   2. DNS changes haven\'t propagated yet (can take up to 48 hours)');
    console.log('   3. You\'re using an A record instead of a CNAME record');
  }
  
  try {
    // Check A record for frontend domain
    const aRecords = await resolve4(frontendDomain);
    console.log(`✅ A record for ${frontendDomain} found: ${aRecords.join(', ')}`);
  } catch (error) {
    console.error(`❌ A record for ${frontendDomain} not found or not propagated yet.`);
  }
}

// Check SSL configuration
async function checkSsl() {
  console.log('\nChecking SSL configuration...');
  
  try {
    // Check API domain SSL
    const apiResponse = await fetch(`https://${customDomain}/rest/v1/`, {
      method: 'HEAD',
    });
    console.log(`✅ SSL for ${customDomain} is working (Status: ${apiResponse.status})`);
  } catch (error) {
    console.error(`❌ SSL for ${customDomain} is not working: ${error.message}`);
  }
  
  try {
    // Check frontend domain SSL
    const frontendResponse = await fetch(frontendUrl, {
      method: 'HEAD',
    });
    console.log(`✅ SSL for ${frontendDomain} is working (Status: ${frontendResponse.status})`);
  } catch (error) {
    console.error(`❌ SSL for ${frontendDomain} is not working: ${error.message}`);
  }
}

// Check Supabase API
async function checkSupabaseApi() {
  console.log('\nChecking Supabase API...');
  
  try {
    const response = await fetch(`https://${customDomain}/rest/v1/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok || response.status === 400) {
      // 400 is expected without proper auth
      console.log(`✅ Supabase API is responding on ${customDomain}`);
    } else {
      console.error(`❌ Supabase API returned unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.error(`❌ Failed to connect to Supabase API: ${error.message}`);
  }
}

// Run all checks
async function runChecks() {
  try {
    await checkDns();
    await checkSsl();
    await checkSupabaseApi();
    
    console.log(`
========================================
Verification Summary
========================================

If all checks passed (✅), your domain is properly configured!

If any checks failed (❌), please review the following:
1. DNS configuration in your domain registrar
2. Supabase custom domain setup
3. SSL certificate provisioning
4. Application configuration

For detailed troubleshooting steps, refer to:
- COMPLETE-DOMAIN-SETUP.md
- DOMAIN-CHECKLIST.md
- DNS-SETUP.md
- SSL-SETUP.md
    `);
  } catch (error) {
    console.error('An error occurred during verification:', error);
  }
}

runChecks();
