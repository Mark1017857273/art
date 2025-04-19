// Edge function to call HuggingFace API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.6";
import { v4 as uuidv4 } from "npm:uuid@9.0.1";

// Environment variables
const HF_API_TOKEN = "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";
const MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the request body
    const { imageUrl, prompt, style } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "Image URL is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Fetch the image from the provided URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch the image" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    // Create a form for the HuggingFace API request
    const formData = new FormData();
    formData.append("inputs", new Blob([imageBuffer], { type: imageBlob.type }));
    
    if (prompt) {
      formData.append("parameters", JSON.stringify({
        prompt: prompt
      }));
    }

    // Call the HuggingFace API
    const hfResponse = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
      },
      body: formData,
    });

    if (!hfResponse.ok) {
      const errorData = await hfResponse.text();
      console.error("HuggingFace API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Error calling HuggingFace API", details: errorData }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get the transformed image
    const transformedImageBuffer = await hfResponse.arrayBuffer();
    const transformedImageBlob = new Blob([transformedImageBuffer], { type: "image/jpeg" });

    // Upload the transformed image to Supabase Storage
    const fileName = `generated/${uuidv4()}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, transformedImageBlob, {
        contentType: "image/jpeg",
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload transformed image" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get the public URL of the uploaded image
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    // Return the result URL
    return new Response(
      JSON.stringify({ resultUrl: urlData.publicUrl }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});