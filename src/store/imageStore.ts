import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../types';
import { uploadImage, processImage } from '../lib/supabase';

interface ImageState {
  images: Image[];
  currentImage: Image | null;
  addImage: (file: File, prompt: string, style: string) => Promise<void>;
  setCurrentImage: (image: Image | null) => void;
  clearImages: () => void;
}

export const useImageStore = create<ImageState>((set, get) => ({
  images: [],
  currentImage: null,

  addImage: async (file: File, prompt: string, style: string) => {
    const id = uuidv4();
    const newImage: Image = {
      id,
      originalUrl: null,
      resultUrl: null,
      prompt,
      style,
      status: 'uploading',
      createdAt: new Date()
    };

    set(state => ({
      images: [newImage, ...state.images],
      currentImage: newImage
    }));

    try {
      // Upload original image
      const path = `original/${id}-${file.name}`;
      const originalUrl = await uploadImage(file, path);

      if (!originalUrl) {
        throw new Error('Failed to upload image');
      }

      // Update state with originalUrl
      set(state => ({
        images: state.images.map(img => 
          img.id === id ? { ...img, originalUrl, status: 'processing' } : img
        ),
        currentImage: state.currentImage?.id === id 
          ? { ...state.currentImage, originalUrl, status: 'processing' } 
          : state.currentImage
      }));

      // Process the image
      const resultUrl = await processImage(originalUrl, prompt, style);

      if (!resultUrl) {
        throw new Error('Failed to process image');
      }

      // Update state with resultUrl
      set(state => ({
        images: state.images.map(img => 
          img.id === id ? { ...img, resultUrl, status: 'completed' } : img
        ),
        currentImage: state.currentImage?.id === id 
          ? { ...state.currentImage, resultUrl, status: 'completed' } 
          : state.currentImage
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Update state with error
      set(state => ({
        images: state.images.map(img => 
          img.id === id ? { ...img, status: 'error', error: errorMessage } : img
        ),
        currentImage: state.currentImage?.id === id 
          ? { ...state.currentImage, status: 'error', error: errorMessage } 
          : state.currentImage
      }));
    }
  },

  setCurrentImage: (image: Image | null) => {
    set({ currentImage: image });
  },

  clearImages: () => {
    set({ images: [], currentImage: null });
  }
}));