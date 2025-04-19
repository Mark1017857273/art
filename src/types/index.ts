export interface Image {
  id: string;
  originalUrl: string | null;
  resultUrl: string | null;
  prompt: string;
  style: string;
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  createdAt: Date;
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  example: string;
  prompt: string;
}