# LegalFriend - AI-Backed Lease Analysis

LegalFriend is an AI-powered application that helps users analyze lease agreements. Upload your lease document, and our AI will extract key terms, provide insights, and highlight potential issues.

## Features

- **AI-Powered Lease Analysis**: Automatically extract and analyze key terms from lease documents
- **Key Term Highlighting**: Identify important provisions with color-coded assessments
- **Market Context**: Get insights on how your lease terms compare to market standards
- **Secure Document Storage**: All documents are securely stored with proper access controls
- **Payment Integration**: Stripe integration for premium analysis features

## Tech Stack

- **Frontend**: React, Vite, Radix UI components
- **Backend**: Supabase (Database, Storage, Edge Functions)
- **AI Processing**: Mistral AI for document analysis
- **Payments**: Stripe

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase CLI
- Stripe account (for payment processing)
- Mistral AI API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd legalfriend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   MISTRAL_API_KEY=your_mistral_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   FRONTEND_URL=http://localhost:5173
   ```

### Supabase Setup

1. Create a new Supabase project

2. Deploy the database schema and storage buckets:
   ```bash
   cd supabase
   node deploy.js
   ```
   
   This script will guide you through:
   - Setting up the database schema
   - Creating storage buckets with proper security policies
   - Deploying edge functions

3. Set up the required environment variables in your Supabase project:
   - Go to Project Settings > API
   - Copy the URL and anon key to your `.env` file
   - Go to Project Settings > Functions
   - Add the environment variables:
     - `MISTRAL_API_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `FRONTEND_URL`

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## Development Workflow

1. **Upload a Lease Document**: Users can upload lease documents in PDF or text format
2. **Document Processing**: The document is stored in Supabase storage and processed by the Mistral AI
3. **Analysis Generation**: Key terms are extracted and analyzed for potential issues
4. **Payment Processing**: Users can pay to unlock the full analysis
5. **View Analysis**: Users can view the complete analysis with all key terms and insights

## Edge Functions

- **process-lease**: Analyzes uploaded lease documents using Mistral AI
- **get-analysis**: Retrieves analysis results with access control based on payment status
- **create-payment**: Creates Stripe checkout sessions for payments
- **stripe-webhook**: Handles Stripe webhook events for payment status updates

## License

This project is licensed under the MIT License - see the LICENSE file for details.
