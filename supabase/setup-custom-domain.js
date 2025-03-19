const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Get the Supabase project reference
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'sdomutarzwghclxpffte';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for custom domain
rl.question('Enter your custom domain (e.g., legalfriend.app): ', (customDomain) => {
  console.log(`Setting up custom domain: ${customDomain} for project: ${SUPABASE_PROJECT_REF}`);

  try {
    // You'll need to login to Supabase CLI first with: npx supabase login
    
    // Set up custom domain
    console.log('Setting up custom domain...');
    execSync(`npx supabase domains create --project-ref ${SUPABASE_PROJECT_REF} ${customDomain}`, { 
      stdio: 'inherit' 
    });
    
    console.log('\nCustom domain setup initiated!');
    console.log('\nFollow these steps to complete the setup:');
    console.log('1. Add the DNS records shown above to your domain registrar');
    console.log('2. Wait for DNS propagation (may take up to 48 hours)');
    console.log('3. Verify your domain in the Supabase dashboard');
    console.log('\nAfter verification, update your .env file with:');
    console.log(`VITE_SUPABASE_URL=https://${customDomain}`);
    console.log(`FRONTEND_URL=https://${customDomain}`);
    
  } catch (error) {
    console.error('Error setting up custom domain:', error.message);
    console.log('');
    console.log('You may need to set up the custom domain manually in the Supabase dashboard:');
    console.log('1. Go to https://supabase.com/dashboard/project/' + SUPABASE_PROJECT_REF + '/settings/general');
    console.log('2. Scroll down to "Custom Domains"');
    console.log('3. Click "Add custom domain" and follow the instructions');
  }
  
  rl.close();
});
