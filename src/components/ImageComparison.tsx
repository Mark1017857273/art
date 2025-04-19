import React, { useState } from 'react';
import { Image } from '../types';

interface ImageComparisonProps {
  image: Image;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ image }) => {
  const [position, setPosition] = useState(50);
  
  if (image.status !== 'completed' || !image.originalUrl || !image.resultUrl) {
    return null;
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - left, width));
    const percent = Math.max(0, Math.min(100, (x / width) * 100));
    setPosition(percent);
  };
  
  return (
    <div className="w-full mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Before & After</h3>
      <div
        className="relative h-80 overflow-hidden rounded-lg cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const div = e.currentTarget;
          const { left, width } = div.getBoundingClientRect();
          const x = Math.max(0, Math.min(touch.clientX - left, width));
          const percent = Math.max(0, Math.min(100, (x / width) * 100));
          setPosition(percent);
        }}
      >
        {/* Original image (background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image.originalUrl})` }}
        />
        
        {/* Result image (foreground) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${image.resultUrl})`,
            width: `${position}%`,
            clipPath: `inset(0 ${100 - position}% 0 0)`
          }}
        />
        
        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-indigo-600" />
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 text-xs rounded">
          Original
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 text-xs rounded">
          AI Art
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;