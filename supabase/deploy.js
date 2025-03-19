#!/usr/bin/env node

/**
 * Supabase Deployment Script
 * 
 * This script automates the deployment of:
 * 1. Database schema
 * 2. Storage buckets
 * 3. Edge functions
 * 
 * Usage:
 * node deploy.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Helper function to prompt for confirmation
function confirm(message) {
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Main deployment function
async function deploy() {
  console.log(`\n${colors.bright}${colors.cyan}=== LegalFriend Supabase Deployment ===${colors.reset}\n`);
  
  // Check if supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'ignore' });
  } catch (error) {
    console.error(`${colors.red}Error: Supabase CLI is not installed.${colors.reset}`);
    console.log(`Please install it by running: npm install -g supabase`);
    process.exit(1);
  }

  // Check if we're logged in to Supabase
  try {
    execSync('supabase projects list', { stdio: 'ignore' });
  } catch (error) {
    console.log(`${colors.yellow}You need to log in to Supabase CLI first.${colors.reset}`);
    executeCommand('supabase login');
  }

  // 1. Deploy database schema
  console.log(`\n${colors.bright}${colors.cyan}Step 1: Deploying database schema${colors.reset}`);
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error(`${colors.red}Error: schema.sql not found at ${schemaPath}${colors.reset}`);
    process.exit(1);
  }

  const deploySchema = await confirm('Deploy database schema?');
  if (deploySchema) {
    console.log(`${colors.green}Deploying schema.sql...${colors.reset}`);
    executeCommand(`supabase db push --db-url $SUPABASE_URL`);
  }

  // 2. Deploy storage buckets
  console.log(`\n${colors.bright}${colors.cyan}Step 2: Setting up storage buckets${colors.reset}`);
  const storagePath = path.join(__dirname, 'storage.sql');
  if (!fs.existsSync(storagePath)) {
    console.error(`${colors.red}Error: storage.sql not found at ${storagePath}${colors.reset}`);
    process.exit(1);
  }

  const deployStorage = await confirm('Set up storage buckets?');
  if (deployStorage) {
    console.log(`${colors.green}Deploying storage.sql...${colors.reset}`);
    executeCommand(`supabase db run --file ${storagePath}`);
  }

  // 3. Deploy edge functions
  console.log(`\n${colors.bright}${colors.cyan}Step 3: Deploying edge functions${colors.reset}`);
  const functionsDir = path.join(__dirname, 'functions');
  if (!fs.existsSync(functionsDir)) {
    console.error(`${colors.red}Error: functions directory not found at ${functionsDir}${colors.reset}`);
    process.exit(1);
  }

  const deployFunctions = await confirm('Deploy edge functions?');
  if (deployFunctions) {
    const functions = fs.readdirSync(functionsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    if (functions.length === 0) {
      console.log(`${colors.yellow}No edge functions found in ${functionsDir}${colors.reset}`);
    } else {
      console.log(`${colors.green}Found ${functions.length} edge functions: ${functions.join(', ')}${colors.reset}`);
      
      for (const func of functions) {
        const deployFunc = await confirm(`Deploy ${func} function?`);
        if (deployFunc) {
          console.log(`${colors.green}Deploying ${func}...${colors.reset}`);
          executeCommand(`supabase functions deploy ${func}`);
        }
      }
    }
  }

  console.log(`\n${colors.bright}${colors.green}Deployment completed!${colors.reset}\n`);
  rl.close();
}

// Run the deployment
deploy().catch(error => {
  console.error(`${colors.red}Deployment failed: ${error.message}${colors.reset}`);
  process.exit(1);
});
