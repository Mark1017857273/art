import React, { useState } from 'react';

interface PromptInputProps {
  defaultPrompt: string;
  onPromptChange: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ defaultPrompt, onPromptChange }) => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    onPromptChange(e.target.value);
  };
  
  return (
    <div className="w-full">
      <label 
        htmlFor="prompt" 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Customize Prompt (Optional)
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={handleChange}
        rows={3}
        placeholder="Describe how you want your image to be transformed..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p className="mt-1 text-xs text-gray-500">
        The AI will use this prompt to guide the transformation. Feel free to customize it or leave as is.
      </p>
    </div>
  );
};

export default PromptInput;