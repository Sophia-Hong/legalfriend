const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Get the Supabase project reference
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'sdomutarzwghclxpffte';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8082';

console.log(`Updating auth configuration for project: ${SUPABASE_PROJECT_REF}`);
console.log(`Setting site URL to: ${FRONTEND_URL}`);

// Update auth settings using the Supabase CLI
try {
  // You'll need to login to Supabase CLI first with: npx supabase login
  
  // Set the site URL
  console.log('Setting site URL...');
  execSync(`npx supabase config set --project-ref ${SUPABASE_PROJECT_REF} auth.site_url ${FRONTEND_URL}`, { 
    stdio: 'inherit' 
  });
  
  // Add redirect URLs
  console.log('Adding redirect URLs...');
  execSync(`npx supabase config set --project-ref ${SUPABASE_PROJECT_REF} auth.additional_redirect_urls "${FRONTEND_URL},${FRONTEND_URL}/review-contract,${FRONTEND_URL}/lease-review-summary"`, { 
    stdio: 'inherit' 
  });
  
  console.log('Auth configuration updated successfully!');
} catch (error) {
  console.error('Error updating auth configuration:', error.message);
  console.log('');
  console.log('You may need to update these settings manually in the Supabase dashboard:');
  console.log('1. Go to https://supabase.com/dashboard/project/' + SUPABASE_PROJECT_REF);
  console.log('2. Navigate to Authentication > URL Configuration');
  console.log('3. Set Site URL to: ' + FRONTEND_URL);
  console.log('4. Add these Redirect URLs:');
  console.log('   - ' + FRONTEND_URL);
  console.log('   - ' + FRONTEND_URL + '/review-contract');
  console.log('   - ' + FRONTEND_URL + '/lease-review-summary');
}
