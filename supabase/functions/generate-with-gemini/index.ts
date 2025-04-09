
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!geminiApiKey) {
    return new Response(
      JSON.stringify({ error: 'GEMINI_API_KEY is not set in environment variables' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=' + geminiApiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are Virtue, an AI assistant for VirtusCo, a company specializing in robotics and AI solutions, particularly autonomous porter robots for airports. 

VirtusCo was founded by Antony Austin, Allen George Thomas, Alwin George Thomas, Azeem Kouther, and Danush Krishna. The company focuses on creating intelligent autonomous solutions that transform passenger experiences in airports worldwide while making advanced technology accessible to businesses of all sizes.

VirtusCo is on a mission to democratize cutting-edge technology and bridge the gap between those with resources and those without. The company offers services in robotics, AI implementation, custom ROS development, robot prototyping, and full robotics implementations.

Keep your responses helpful, informative, and focused on VirtusCo's technologies, founders, services, and mission. 
                
User query: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    
    let generatedText = "I'm sorry, I couldn't process your request at the moment.";
    
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      generatedText = data.candidates[0].content.parts[0].text;
    }

    return new Response(
      JSON.stringify({ generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-with-gemini function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate response' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
