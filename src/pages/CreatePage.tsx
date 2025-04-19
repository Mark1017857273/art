import React, { useState, useEffect } from 'react';
import { useImageStore } from '../store/imageStore';
import { artStyles } from '../data/styles';
import { ArtStyle } from '../types';
import ImageUpload from '../components/ImageUpload';
import StyleSelector from '../components/StyleSelector';
import PromptInput from '../components/PromptInput';
import ProcessingStatus from '../components/ProcessingStatus';
import ImageResult from '../components/ImageResult';
import ImageComparison from '../components/ImageComparison';

const CreatePage: React.FC = () => {
  const { addImage, currentImage, setCurrentImage } = useImageStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>(artStyles[0]);
  const [customPrompt, setCustomPrompt] = useState<string>(artStyles[0].prompt);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Reset current image when component mounts
  useEffect(() => {
    setCurrentImage(null);
  }, [setCurrentImage]);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleStyleSelect = (style: ArtStyle) => {
    setSelectedStyle(style);
    setCustomPrompt(style.prompt);
  };
  
  const handlePromptChange = (prompt: string) => {
    setCustomPrompt(prompt);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image to transform');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await addImage(selectedFile, customPrompt, selectedStyle.id);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create AI Art</h1>
      <p className="text-gray-600 mb-8">
        Transform your photos into stunning artistic masterpieces with AI
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Input form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ImageUpload onFileSelected={handleFileSelected} />
            
            <StyleSelector 
              selectedStyle={selectedStyle.id} 
              onStyleSelect={handleStyleSelect} 
            />
            
            <PromptInput 
              defaultPrompt={selectedStyle.prompt} 
              onPromptChange={handlePromptChange} 
            />
            
            <button
              type="submit"
              disabled={!selectedFile || isProcessing}
              className={`
                w-full py-3 rounded-md font-medium transition-all
                ${!selectedFile || isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                }
              `}
            >
              {isProcessing ? 'Processing...' : 'Transform My Photo'}
            </button>
          </form>
        </div>
        
        {/* Right column: Preview and result */}
        <div className="space-y-6">
          {currentImage ? (
            <>
              {currentImage.status === 'completed' ? (
                <>
                  <ImageComparison image={currentImage} />
                  <ImageResult image={currentImage} />
                </>
              ) : (
                <ProcessingStatus image={currentImage} />
              )}
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Your transformed image will appear here
              </h3>
              <p className="text-gray-500">
                Upload a photo and select a style to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;