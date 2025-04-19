import React from 'react';
import { Image as ImageType } from '../types';
import { Download, Trash2, Eye } from 'lucide-react';

interface GalleryGridProps {
  images: ImageType[];
  onSelectImage: (image: ImageType) => void;
  onDeleteImage?: (image: ImageType) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  onSelectImage,
  onDeleteImage
}) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 mb-2">No images found</p>
        <p className="text-sm text-gray-400">
          Upload a photo and create some art to see it here
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map(image => (
        <div 
          key={image.id} 
          className="group relative rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white"
        >
          {image.resultUrl && (
            <div className="relative aspect-square">
              <img 
                src={image.resultUrl}
                alt={`AI artwork ${image.id}`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => onSelectImage(image)}
                    className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-700 transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  
                  <div className="flex space-x-2">
                    <a
                      href={image.resultUrl}
                      download
                      className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-700 transition-colors"
                      title="Download image"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    
                    {onDeleteImage && (
                      <button
                        onClick={() => onDeleteImage(image)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white text-gray-700 transition-colors"
                        title="Delete image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-3">
            <p className="text-sm text-gray-500">
              {new Date(image.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400 truncate">
              Style: {image.style}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;