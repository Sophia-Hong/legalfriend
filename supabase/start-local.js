#!/usr/bin/env node

/**
 * Supabase Local Development Script
 * 
 * This script helps start a local Supabase instance for development
 * and serves the edge functions locally.
 * 
 * Usage:
 * node start-local.js
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
async function startLocal() {
  console.log(`\n${colors.bright}${colors.cyan}=== LegalFriend Local Development ===${colors.reset}\n`);
  
  // Check if supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'ignore' });
  } catch (error) {
    console.error(`${colors.red}Error: Supabase CLI is not installed.${colors.reset}`);
    console.log(`Please install it by running: npm install -g supabase`);
    process.exit(1);
  }

  // Check if Docker is running
  try {
    execSync('docker info', { stdio: 'ignore' });
  } catch (error) {
    console.error(`${colors.red}Error: Docker is not running.${colors.reset}`);
    console.log(`Please start Docker and try again.`);
    process.exit(1);
  }

  // Start Supabase locally
  console.log(`${colors.green}Starting Supabase locally...${colors.reset}`);
  executeCommand('supabase start');

  // Apply schema
  console.log(`\n${colors.green}Applying database schema...${colors.reset}`);
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    executeCommand(`supabase db reset`);
  } else {
    console.log(`${colors.yellow}Warning: schema.sql not found at ${schemaPath}${colors.reset}`);
  }

  // Apply storage configuration
  console.log(`\n${colors.green}Applying storage configuration...${colors.reset}`);
  const storagePath = path.join(__dirname, 'storage.sql');
  if (fs.existsSync(storagePath)) {
    executeCommand(`supabase db run --file ${storagePath}`);
  } else {
    console.log(`${colors.yellow}Warning: storage.sql not found at ${storagePath}${colors.reset}`);
  }

  // Serve edge functions
  console.log(`\n${colors.green}Starting edge functions...${colors.reset}`);
  executeCommand('supabase functions serve', { ignoreError: true });
}

// Run the script
startLocal().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});
