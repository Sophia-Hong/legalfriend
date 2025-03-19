// Test script for edge functions
const fetch = require('node-fetch');

// Base URL for local edge functions
const baseUrl = 'http://127.0.0.1:54321/functions/v1';

// Test process-lease function
async function testProcessLease() {
  try {
    const response = await fetch(`${baseUrl}/process-lease`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: '123e4567-e89b-12d3-a456-426614174000' // Test contract ID
      }),
    });
    
    const data = await response.json();
    console.log('Process Lease Response:', data);
    return data;
  } catch (error) {
    console.error('Error testing process-lease:', error);
  }
}

// Test get-analysis function
async function testGetAnalysis() {
  try {
    const response = await fetch(`${baseUrl}/get-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: '123e4567-e89b-12d3-a456-426614174000' // Test contract ID
      }),
    });
    
    const data = await response.json();
    console.log('Get Analysis Response:', data);
    return data;
  } catch (error) {
    console.error('Error testing get-analysis:', error);
  }
}

// Test create-payment function
async function testCreatePayment() {
  try {
    const response = await fetch(`${baseUrl}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: '123e4567-e89b-12d3-a456-426614174000', // Test contract ID
        userId: '123e4567-e89b-12d3-a456-426614174001', // Test user ID
        returnUrl: 'http://localhost:8080/lease-review-summary'
      }),
    });
    
    const data = await response.json();
    console.log('Create Payment Response:', data);
    return data;
  } catch (error) {
    console.error('Error testing create-payment:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Testing Edge Functions...');
  
  console.log('\n1. Testing process-lease function:');
  await testProcessLease();
  
  console.log('\n2. Testing get-analysis function:');
  await testGetAnalysis();
  
  console.log('\n3. Testing create-payment function:');
  await testCreatePayment();
}

runTests();
