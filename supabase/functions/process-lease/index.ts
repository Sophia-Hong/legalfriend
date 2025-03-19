import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeaseAnalysisResult {
  summary: string;
  keyTerms: {
    provision: string;
    section: string;
    details: string[];
    assessment: {
      type: 'success' | 'warning' | 'error';
      text: string;
      info?: string;
    };
  }[];
  insights: Record<string, unknown>;
  benchmarks: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractId } = await req.json();
    console.log('Processing lease document:', contractId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get contract details
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .single();

    if (contractError || !contract) {
      throw new Error(`Contract not found: ${contractError?.message}`);
    }

    // Update contract status to processing
    await supabase
      .from('contracts')
      .update({ status: 'processing' })
      .eq('id', contractId);

    // Get the file from storage
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('lease_documents')
      .download(contract.file_url);

    if (fileError || !fileData) {
      throw new Error(`File not found: ${fileError?.message}`);
    }

    // Extract text from the document
    const text = await extractTextFromDocument(fileData);

    // Analyze the lease with Mistral AI
    const analysis = await analyzeLeaseWithMistral(text);

    // Update the analysis record
    const { data: existingAnalysis, error: analysisQueryError } = await supabase
      .from('analyses')
      .select('id')
      .eq('contract_id', contractId)
      .maybeSingle();

    if (analysisQueryError) {
      throw new Error(`Error querying analysis: ${analysisQueryError.message}`);
    }

    let analysisId;
    if (existingAnalysis) {
      // Update existing analysis
      await supabase
        .from('analyses')
        .update({
          summary: analysis.summary,
          insights: analysis.insights,
          benchmarks: analysis.benchmarks,
          status: 'completed'
        })
        .eq('id', existingAnalysis.id);
      
      analysisId = existingAnalysis.id;
    } else {
      // Create new analysis
      const { data: newAnalysis, error: insertError } = await supabase
        .from('analyses')
        .insert({
          contract_id: contractId,
          summary: analysis.summary,
          insights: analysis.insights,
          benchmarks: analysis.benchmarks,
          status: 'completed'
        })
        .select('id')
        .single();

      if (insertError || !newAnalysis) {
        throw new Error(`Error creating analysis: ${insertError?.message}`);
      }

      analysisId = newAnalysis.id;
    }

    // Insert key terms
    for (const term of analysis.keyTerms) {
      await supabase
        .from('keyterms')
        .insert({
          analysis_id: analysisId,
          provision: term.provision,
          section: term.section,
          details: term.details,
          assessment: term.assessment
        });
    }

    // Update contract status to completed
    await supabase
      .from('contracts')
      .update({ status: 'completed' })
      .eq('id', contractId);

    return new Response(
      JSON.stringify({ 
        message: 'Lease analysis completed successfully',
        analysisId
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error processing lease document:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400 
      }
    );
  }
});

async function extractTextFromDocument(file: Blob): Promise<string> {
  // For PDF files, you would use a PDF extraction library
  // For this example, we'll assume the file is a text file
  return await file.text();
  
  // In a production environment, you would use something like:
  // const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.js');
  // const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;
  // ... extract text from each page
}

async function analyzeLeaseWithMistral(text: string): Promise<LeaseAnalysisResult> {
  const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
  if (!mistralApiKey) {
    throw new Error('MISTRAL_API_KEY is not set');
  }

  const prompt = `
  You are a legal expert specializing in lease agreements. Analyze the following lease document and provide:
  
  1. A concise summary of the lease (max 300 words)
  2. Key terms with their details, organized by provision (rent, security deposit, termination, etc.)
  3. Assessment of each key term (favorable, standard, or concerning)
  4. Market context and insights for concerning terms
  
  For each key term, include:
  - Provision name
  - Section reference
  - Specific details from the lease
  - Assessment (success, warning, or error) with explanation
  
  Format your response as a JSON object with the following structure:
  {
    "summary": "string",
    "keyTerms": [
      {
        "provision": "string",
        "section": "string",
        "details": ["string"],
        "assessment": {
          "type": "success|warning|error",
          "text": "string",
          "info": "string"
        }
      }
    ],
    "insights": {},
    "benchmarks": {}
  }
  
  Here is the lease document:
  ${text}
  `;

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mistralApiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mistral API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;
    
    // Extract the JSON from the response
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;
    
    try {
      return JSON.parse(jsonString);
    } catch (jsonError) {
      console.error('Error parsing JSON from Mistral response:', jsonError);
      console.log('Raw response:', content);
      
      // Fallback to a basic structure if parsing fails
      return {
        summary: "Failed to parse detailed analysis. Please review the document manually.",
        keyTerms: [
          {
            provision: "General",
            section: "N/A",
            details: ["Automated analysis failed"],
            assessment: {
              type: "error",
              text: "⚠ Analysis error occurred",
              info: "The system encountered an error while analyzing this document."
            }
          }
        ],
        insights: {},
        benchmarks: {}
      };
    }
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    throw error;
  }
}
