import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Image as ImageType } from '../types';

interface ImageResultProps {
  image: ImageType;
}

const ImageResult: React.FC<ImageResultProps> = ({ image }) => {
  if (image.status !== 'completed' || !image.resultUrl) {
    return null;
  }
  
  const handleDownload = () => {
    if (!image.resultUrl) return;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = image.resultUrl;
    link.download = `ai-art-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = async () => {
    if (!image.resultUrl) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI-Generated Artwork',
          text: 'Check out this artwork I created with AI!',
          url: image.resultUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copy link to clipboard
      navigator.clipboard.writeText(image.resultUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link:', err));
    }
  };
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your AI Artwork</h3>
          <p className="text-gray-600 text-sm mb-4">
            Here's your transformed image in {image.style} style
          </p>
        </div>
        
        <div className="relative">
          <img 
            src={image.resultUrl} 
            alt="AI-generated artwork" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="p-4 flex justify-between">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageResult;