#!/usr/bin/env node

/**
 * Supabase Edge Functions Deployment Script
 * 
 * This script deploys edge functions to your Supabase project.
 * 
 * Usage:
 * node deploy-functions.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Helper function to execute commands
function executeCommand(command, options = {}) {
  console.log(`${colors.dim}> ${command}${colors.reset}`);
  try {
    return execSync(command, { 
      stdio: 'inherit',
      ...options
    });
  } catch (error) {
    console.error(`${colors.red}Command failed: ${command}${colors.reset}`);
    if (!options.ignoreError) {
      process.exit(1);
    }
    return null;
  }
}

// Main function
async function deployFunctions() {
  console.log(`\n${colors.bright}${colors.cyan}=== LegalFriend Edge Functions Deployment ===${colors.reset}\n`);
  
  // Check if supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'ignore' });
  } catch (error) {
    console.error(`${colors.red}Error: Supabase CLI is not installed.${colors.reset}`);
    console.log(`Please install it by running: npm install -g supabase`);
    process.exit(1);
  }

  // Login to Supabase (if not already logged in)
  console.log(`${colors.green}Checking Supabase login status...${colors.reset}`);
  try {
    execSync('supabase projects list', { stdio: 'ignore' });
  } catch (error) {
    console.log(`${colors.yellow}You need to log in to Supabase CLI first.${colors.reset}`);
    executeCommand('supabase login');
  }

  // Get the project reference
  const projectRef = 'sdomutarzwghclxpffte';
  
  // Deploy edge functions
  console.log(`\n${colors.green}Deploying edge functions to project ${projectRef}...${colors.reset}`);
  
  // Get list of function directories
  const functionsDir = path.join(__dirname, 'functions');
  const functionDirs = fs.readdirSync(functionsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  if (functionDirs.length === 0) {
    console.log(`${colors.yellow}No edge functions found in ${functionsDir}${colors.reset}`);
    process.exit(0);
  }
  
  // Deploy each function
  for (const funcName of functionDirs) {
    console.log(`\n${colors.green}Deploying function: ${funcName}${colors.reset}`);
    executeCommand(`supabase functions deploy ${funcName} --project-ref ${projectRef}`);
  }
  
  // Set environment variables for edge functions
  console.log(`\n${colors.green}Setting environment variables for edge functions...${colors.reset}`);
  
  // Read from .env file
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = envContent.split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const [key, value] = line.split('=');
        return { key: key.trim(), value: value ? value.trim() : '' };
      })
      .filter(({ key }) => ['MISTRAL_API_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'FRONTEND_URL'].includes(key));
    
    for (const { key, value } of envVars) {
      if (value && value !== `your_${key.toLowerCase()}_here`) {
        console.log(`Setting ${key}...`);
        executeCommand(`supabase secrets set ${key}=${value} --project-ref ${projectRef}`, { ignoreError: true });
      } else {
        console.log(`${colors.yellow}Warning: ${key} is not set in .env file${colors.reset}`);
      }
    }
  } else {
    console.log(`${colors.yellow}Warning: .env file not found at ${envPath}${colors.reset}`);
  }
  
  console.log(`\n${colors.bright}${colors.green}Edge functions deployed successfully!${colors.reset}`);
}

// Run the script
deployFunctions().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});
