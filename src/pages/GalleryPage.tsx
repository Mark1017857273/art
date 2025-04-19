import React, { useState, useEffect } from 'react';
import { useImageStore } from '../store/imageStore';
import GalleryGrid from '../components/GalleryGrid';
import { Image } from '../types';
import { X } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { images } = useImageStore();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  
  useEffect(() => {
    // You could load images from Supabase here if needed
  }, []);
  
  const handleSelectImage = (image: Image) => {
    setSelectedImage(image);
  };
  
  const handleCloseDetail = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Gallery</h1>
      <p className="text-gray-600 mb-8">
        Browse all your AI-generated artwork
      </p>
      
      {/* Main gallery grid */}
      <GalleryGrid 
        images={images.filter(img => img.status === 'completed')} 
        onSelectImage={handleSelectImage}
      />
      
      {/* Image detail modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">Artwork Details</h3>
              <button 
                onClick={handleCloseDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Original Photo</h4>
                  {selectedImage.originalUrl && (
                    <img 
                      src={selectedImage.originalUrl} 
                      alt="Original" 
                      className="w-full h-auto rounded-md" 
                    />
                  )}
                </div>
                
                {/* Generated Image */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">AI Artwork</h4>
                  {selectedImage.resultUrl && (
                    <img 
                      src={selectedImage.resultUrl} 
                      alt="AI Generated" 
                      className="w-full h-auto rounded-md" 
                    />
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Style:</span> {selectedImage.style}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Created:</span> {new Date(selectedImage.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Prompt:</span> {selectedImage.prompt}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={handleCloseDetail}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;