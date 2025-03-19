import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Add Deno namespace declaration
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

// Add type declarations for external modules
declare module 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/+esm' {
  export function getDocument(options: { data: ArrayBuffer }): { promise: PDFDocumentProxy };
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }
  export interface PDFPageProxy {
    getTextContent(): Promise<PDFTextContent>;
  }
  export interface PDFTextContent {
    items: Array<{ str?: string }>;
  }
  export const GlobalWorkerOptions: { workerSrc: any };
}

declare module 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js' {}

declare module 'https://esm.sh/mammoth@1.6.0' {
  export function extractRawText(options: { arrayBuffer: ArrayBuffer }): Promise<{ value: string }>;
}

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

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractId } = await req.json();
    console.log('Processing lease document:', contractId);

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
  try {
    // Get file extension from the content type
    const contentType = file.type;
    console.log(`Processing file with content type: ${contentType}`);
    
    if (contentType.includes('pdf')) {
      // PDF extraction using PDF.js
      const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/+esm');
      
      // Configure PDF.js worker
      const pdfjsWorker = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js');
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      
      // Load the PDF document
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      // Extract text from all pages
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => 'str' in item ? item.str : '').join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } 
    else if (contentType.includes('word') || contentType.includes('docx') || contentType.includes('doc')) {
      // For Word documents, use mammoth.js
      const mammoth = await import('https://esm.sh/mammoth@1.6.0');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    else if (contentType.includes('image')) {
      // For scanned documents (images), use Mistral's OCR capabilities
      return await extractTextWithMistralOCR(file);
    }
    else {
      // Default fallback - try to read as text
      return await file.text();
    }
  } catch (error) {
    console.error('Error extracting text from document:', error);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
}

async function extractTextWithMistralOCR(file: Blob): Promise<string> {
  const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
  if (!mistralApiKey) {
    throw new Error('MISTRAL_API_KEY is not set');
  }
  
  // Convert the file to base64
  const arrayBuffer = await file.arrayBuffer();
  const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  
  // Create a prompt for OCR
  const prompt = `This is a scanned document. Please extract all the text content from this image as accurately as possible. Maintain the original formatting as much as you can.`;
  
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
          { 
            role: 'user', 
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: `data:${file.type};base64,${base64Data}` } }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mistral API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error using Mistral OCR:', error);
    throw error;
  }
}

async function analyzeLeaseWithMistral(text: string): Promise<Record<string, unknown>> {
  try {
    // Get the active prompt from the database
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('*, prompt_versions(*)')
      .eq('is_active', true)
      .single();

    if (promptError) {
      console.error('Error fetching prompt:', promptError);
      throw new Error('Failed to fetch active prompt');
    }

    // Find the active version
    const activeVersion = promptData.prompt_versions.find(
      (version: Record<string, any>) => version.is_active
    );

    if (!activeVersion) {
      console.error('No active prompt version found');
      throw new Error('No active prompt version found');
    }

    // Replace the placeholder with the actual text
    const promptTemplate = activeVersion.content;
    const prompt = promptTemplate.replace('${text}', text);

    // Get AI settings from admin_settings
    const { data: aiSettingsData, error: aiSettingsError } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'ai_settings')
      .single();

    let aiSettings = {
      model: 'mistral-large-latest',
      temperature: 0.2,
      max_tokens: 4000
    };

    if (!aiSettingsError && aiSettingsData) {
      aiSettings = aiSettingsData.value;
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('MISTRAL_API_KEY')}`
      },
      body: JSON.stringify({
        model: aiSettings.model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: aiSettings.temperature,
        max_tokens: aiSettings.max_tokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mistral API error:', errorText);
      throw new Error(`Mistral API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    
    // Log the analysis to admin_logs
    await supabase.from('admin_logs').insert({
      action: 'analyze_lease',
      details: {
        prompt_id: promptData.id,
        prompt_version_id: activeVersion.id,
        model: aiSettings.model,
        tokens_used: data.usage?.total_tokens || 0
      }
    });

    return data;
  } catch (error) {
    console.error('Error analyzing lease with Mistral:', error);
    throw error;
  }
}
