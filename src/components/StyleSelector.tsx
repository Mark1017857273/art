import React from 'react';
import { Check } from 'lucide-react';
import { ArtStyle } from '../types';
import { artStyles } from '../data/styles';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: ArtStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Choose a Style</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {artStyles.map(style => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`
              relative overflow-hidden rounded-lg cursor-pointer
              border-2 transition-all
              ${selectedStyle === style.id 
                ? 'border-indigo-500 ring-2 ring-indigo-300' 
                : 'border-transparent hover:border-indigo-300'
              }
            `}
          >
            <img 
              src={style.example} 
              alt={style.name} 
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white font-medium text-sm">{style.name}</p>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-0.5">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;