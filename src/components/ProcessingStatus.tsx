import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Image } from '../types';

interface ProcessingStatusProps {
  image: Image;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ image }) => {
  const renderStatus = () => {
    switch (image.status) {
      case 'uploading':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Uploading Your Photo</h3>
            <p className="text-gray-500 text-center mt-2">
              This should only take a moment...
            </p>
          </div>
        );
        
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Creating Your Artwork</h3>
            <p className="text-gray-500 text-center mt-2">
              The AI is transforming your photo. This may take up to 30 seconds...
            </p>
            <div className="w-full mt-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        );
        
      case 'completed':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Transformation Complete!</h3>
            <p className="text-gray-500 text-center mt-2">
              Your artistic photo has been successfully created.
            </p>
          </div>
        );
        
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-800">Something Went Wrong</h3>
            <p className="text-gray-500 text-center mt-2">
              {image.error || 'There was an error processing your image. Please try again.'}
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {renderStatus()}
    </div>
  );
};

export default ProcessingStatus;