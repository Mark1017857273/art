import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onFileSelected: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onFileSelected(file);
  }, [onFileSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };
  
  return (
    <div className="w-full">
      {!preview ? (
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            transition-colors cursor-pointer
            ${isDragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-indigo-500 mb-4" />
          <p className="text-gray-700 text-center mb-2">
            {isDragActive 
              ? 'Drop your image here...' 
              : 'Drag & drop your image here, or click to select'
            }
          </p>
          <p className="text-gray-500 text-sm text-center">
            Supported formats: JPEG, PNG, WebP (Max 5MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-auto object-cover" 
          />
          <button 
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-gray-800/70 text-white rounded-full hover:bg-gray-900/90 transition-colors"
            aria-label="Clear selection"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;