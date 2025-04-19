import { ArtStyle } from '../types';

export const artStyles: ArtStyle[] = [
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classic oil painting style with rich textures and colors',
    example: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg',
    prompt: 'Convert the image to a detailed oil painting with rich textures, vibrant colors, and visible brushstrokes, in the style of classic masters'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Delicate watercolor style with soft edges and transparent colors',
    example: 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg',
    prompt: 'Transform the image into a delicate watercolor painting with soft, flowing colors, transparent washes, and gentle transitions'
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold, colorful pop art style inspired by Andy Warhol',
    example: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg',
    prompt: 'Convert the image to vibrant pop art style with bold outlines, bright colors, halftone patterns, and high contrast, inspired by Andy Warhol'
  },
  {
    id: 'sketch',
    name: 'Pencil Sketch',
    description: 'Hand-drawn pencil sketch with fine details',
    example: 'https://images.pexels.com/photos/1046398/pexels-photo-1046398.jpeg',
    prompt: 'Transform the image into a detailed pencil sketch with fine lines, shading, and textured paper effect'
  },
  {
    id: 'anime',
    name: 'Anime Style',
    description: 'Japanese anime illustration style',
    example: 'https://images.pexels.com/photos/1716589/pexels-photo-1716589.jpeg',
    prompt: 'Convert the image to Japanese anime style with characteristic large eyes, simplified features, and clean linework'
  },
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Impressionist painting style with visible brushstrokes',
    example: 'https://images.pexels.com/photos/161154/stained-glass-spiral-circle-pattern-161154.jpeg',
    prompt: 'Transform the image into an impressionist painting with visible brushstrokes, vibrant colors capturing light effects, in the style of Monet or Renoir'
  }
];