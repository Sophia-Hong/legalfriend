import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
}

// Check if user is an admin
async function isAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return false;
  }

  return data.role === 'admin';
}

// Log admin action
async function logAdminAction(supabase: any, userId: string, action: string, details: any = {}) {
  await supabase
    .from('admin_logs')
    .insert({
      user_id: userId,
      action,
      details
    });
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Create Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get authorization header
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Missing authorization header' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
    );
  }

  // Get user ID from JWT
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  
  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid token' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
    );
  }

  // Check if user is admin
  const admin = await isAdmin(supabase, user.id);
  if (!admin) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Admin access required' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
    );
  }

  // Parse URL to get endpoint and ID
  const url = new URL(req.url);
  const path = url.pathname.split('/').filter(Boolean);
  const endpoint = path[1]; // admin-api is [0], endpoint is [1]
  const resourceId = path[2]; // Optional resource ID

  try {
    // Handle different endpoints
    switch (endpoint) {
      case 'prompts':
        return await handlePrompts(req, supabase, user.id, resourceId);
      
      case 'prompt-versions':
        return await handlePromptVersions(req, supabase, user.id, resourceId);
      
      case 'settings':
        return await handleSettings(req, supabase, user.id, resourceId);
      
      case 'logs':
        return await handleLogs(req, supabase, user.id);
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid endpoint' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
    }
  } catch (error) {
    console.error('Error in admin API:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Handle prompts endpoint
async function handlePrompts(req: Request, supabase: any, userId: string, promptId?: string) {
  const method = req.method;
  
  // GET - List all prompts or get a specific prompt
  if (method === 'GET') {
    if (promptId) {
      // Get a specific prompt with its versions
      const { data: prompt, error: promptError } = await supabase
        .from('prompts')
        .select('*, prompt_versions(*)')
        .eq('id', promptId)
        .single();
      
      if (promptError) {
        return new Response(
          JSON.stringify({ error: promptError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }
      
      return new Response(
        JSON.stringify(prompt),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // List all prompts
      const { data: prompts, error: promptsError } = await supabase
        .from('prompts')
        .select('*');
      
      if (promptsError) {
        return new Response(
          JSON.stringify({ error: promptsError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify(prompts),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
  
  // POST - Create a new prompt
  if (method === 'POST') {
    const body = await req.json();
    
    const { data: prompt, error: promptError } = await supabase
      .from('prompts')
      .insert({
        name: body.name,
        description: body.description,
        is_active: body.is_active || false
      })
      .select()
      .single();
    
    if (promptError) {
      return new Response(
        JSON.stringify({ error: promptError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'create_prompt', { promptId: prompt.id });
    
    return new Response(
      JSON.stringify(prompt),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
    );
  }
  
  // PUT - Update a prompt
  if (method === 'PUT' && promptId) {
    const body = await req.json();
    
    const { data: prompt, error: promptError } = await supabase
      .from('prompts')
      .update({
        name: body.name,
        description: body.description,
        is_active: body.is_active
      })
      .eq('id', promptId)
      .select()
      .single();
    
    if (promptError) {
      return new Response(
        JSON.stringify({ error: promptError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'update_prompt', { promptId });
    
    return new Response(
      JSON.stringify(prompt),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // DELETE - Delete a prompt
  if (method === 'DELETE' && promptId) {
    const { error: promptError } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId);
    
    if (promptError) {
      return new Response(
        JSON.stringify({ error: promptError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'delete_prompt', { promptId });
    
    return new Response(
      null,
      { headers: corsHeaders, status: 204 }
    );
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
  );
}

// Handle prompt versions endpoint
async function handlePromptVersions(req: Request, supabase: any, userId: string, versionId?: string) {
  const method = req.method;
  
  // GET - List all prompt versions or get a specific version
  if (method === 'GET') {
    const url = new URL(req.url);
    const promptId = url.searchParams.get('promptId');
    
    if (versionId) {
      // Get a specific prompt version
      const { data: version, error: versionError } = await supabase
        .from('prompt_versions')
        .select('*')
        .eq('id', versionId)
        .single();
      
      if (versionError) {
        return new Response(
          JSON.stringify({ error: versionError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }
      
      return new Response(
        JSON.stringify(version),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (promptId) {
      // List versions for a specific prompt
      const { data: versions, error: versionsError } = await supabase
        .from('prompt_versions')
        .select('*')
        .eq('prompt_id', promptId)
        .order('version', { ascending: false });
      
      if (versionsError) {
        return new Response(
          JSON.stringify({ error: versionsError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify(versions),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // List all prompt versions
      const { data: versions, error: versionsError } = await supabase
        .from('prompt_versions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (versionsError) {
        return new Response(
          JSON.stringify({ error: versionsError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify(versions),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
  
  // POST - Create a new prompt version
  if (method === 'POST') {
    const body = await req.json();
    
    // Get the latest version number for this prompt
    const { data: latestVersion, error: versionError } = await supabase
      .from('prompt_versions')
      .select('version')
      .eq('prompt_id', body.prompt_id)
      .order('version', { ascending: false })
      .limit(1)
      .single();
    
    const newVersion = latestVersion ? latestVersion.version + 1 : 1;
    
    // Create the new version
    const { data: version, error: createError } = await supabase
      .from('prompt_versions')
      .insert({
        prompt_id: body.prompt_id,
        version: newVersion,
        content: body.content,
        output_schema: body.output_schema,
        is_active: body.is_active || false,
        created_by: userId
      })
      .select()
      .single();
    
    if (createError) {
      return new Response(
        JSON.stringify({ error: createError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // If this version is active, deactivate all other versions
    if (version.is_active) {
      await supabase
        .from('prompt_versions')
        .update({ is_active: false })
        .eq('prompt_id', body.prompt_id)
        .neq('id', version.id);
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'create_prompt_version', { 
      promptId: body.prompt_id,
      versionId: version.id,
      versionNumber: newVersion
    });
    
    return new Response(
      JSON.stringify(version),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
    );
  }
  
  // PUT - Update a prompt version
  if (method === 'PUT' && versionId) {
    const body = await req.json();
    
    const { data: version, error: updateError } = await supabase
      .from('prompt_versions')
      .update({
        content: body.content,
        output_schema: body.output_schema,
        is_active: body.is_active
      })
      .eq('id', versionId)
      .select()
      .single();
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // If this version is active, deactivate all other versions
    if (version.is_active) {
      await supabase
        .from('prompt_versions')
        .update({ is_active: false })
        .eq('prompt_id', version.prompt_id)
        .neq('id', versionId);
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'update_prompt_version', { 
      versionId,
      promptId: version.prompt_id,
      versionNumber: version.version
    });
    
    return new Response(
      JSON.stringify(version),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // DELETE - Delete a prompt version
  if (method === 'DELETE' && versionId) {
    // Get the version details before deleting
    const { data: version } = await supabase
      .from('prompt_versions')
      .select('prompt_id, version')
      .eq('id', versionId)
      .single();
    
    const { error: deleteError } = await supabase
      .from('prompt_versions')
      .delete()
      .eq('id', versionId);
    
    if (deleteError) {
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    if (version) {
      await logAdminAction(supabase, userId, 'delete_prompt_version', { 
        versionId,
        promptId: version.prompt_id,
        versionNumber: version.version
      });
    }
    
    return new Response(
      null,
      { headers: corsHeaders, status: 204 }
    );
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
  );
}

// Handle settings endpoint
async function handleSettings(req: Request, supabase: any, userId: string, settingKey?: string) {
  const method = req.method;
  
  // GET - List all settings or get a specific setting
  if (method === 'GET') {
    if (settingKey) {
      // Get a specific setting
      const { data: setting, error: settingError } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('key', settingKey)
        .single();
      
      if (settingError) {
        return new Response(
          JSON.stringify({ error: settingError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }
      
      return new Response(
        JSON.stringify(setting),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // List all settings
      const { data: settings, error: settingsError } = await supabase
        .from('admin_settings')
        .select('*');
      
      if (settingsError) {
        return new Response(
          JSON.stringify({ error: settingsError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify(settings),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
  
  // PUT - Update a setting
  if (method === 'PUT' && settingKey) {
    const body = await req.json();
    
    const { data: setting, error: settingError } = await supabase
      .from('admin_settings')
      .update({
        value: body.value,
        description: body.description
      })
      .eq('key', settingKey)
      .select()
      .single();
    
    if (settingError) {
      return new Response(
        JSON.stringify({ error: settingError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'update_setting', { 
      key: settingKey,
      value: body.value
    });
    
    return new Response(
      JSON.stringify(setting),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // POST - Create a new setting
  if (method === 'POST') {
    const body = await req.json();
    
    const { data: setting, error: settingError } = await supabase
      .from('admin_settings')
      .insert({
        key: body.key,
        value: body.value,
        description: body.description
      })
      .select()
      .single();
    
    if (settingError) {
      return new Response(
        JSON.stringify({ error: settingError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Log the action
    await logAdminAction(supabase, userId, 'create_setting', { 
      key: body.key,
      value: body.value
    });
    
    return new Response(
      JSON.stringify(setting),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 201 }
    );
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
  );
}

// Handle logs endpoint
async function handleLogs(req: Request, supabase: any, userId: string) {
  const method = req.method;
  
  // Only GET method is allowed for logs
  if (method === 'GET') {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Get logs with pagination
    const { data: logs, error: logsError } = await supabase
      .from('admin_logs')
      .select('*, profiles:user_id(email, full_name)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (logsError) {
      return new Response(
        JSON.stringify({ error: logsError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // Get total count
    const { count, error: countError } = await supabase
      .from('admin_logs')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      return new Response(
        JSON.stringify({ error: countError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    return new Response(
      JSON.stringify({
        logs,
        pagination: {
          total: count,
          limit,
          offset
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 405 }
  );
}
