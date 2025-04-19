import { createClient } from '@supabase/supabase-js';

// These will be provided when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(file: File, path: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in upload process:', error);
    return null;
  }
}

export async function processImage(imageUrl: string, prompt: string, style: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('transform-image', {
      body: { imageUrl, prompt, style }
    });

    if (error) {
      console.error('Error processing image:', error);
      return null;
    }

    return data.resultUrl;
  } catch (error) {
    console.error('Error in processing:', error);
    return null;
  }
}

export async function getImagesList(): Promise<any[]> {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .list('generated', {
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error getting images list:', error);
      return [];
    }

    return data.map(file => ({
      name: file.name,
      url: supabase.storage.from('images').getPublicUrl(`generated/${file.name}`).data.publicUrl,
      size: file.metadata.size,
      created: file.created_at
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}