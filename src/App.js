// App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ImageUploader from './components/ImageUploader';
import DrawingTools from './components/DrawingTools';
import ColorPalette from './components/ColorPalette';
import AnimationPanel from './components/AnimationPanel';
import GradientComponent from './components/GradientComponent';

const App = () => {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [selectedColor, setSelectedColor] = useState('black');
  const [frames, setFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Function to handle tool selection
  const handleToolSelection = (tool) => {
    setSelectedTool(tool);
    // Implement logic for handling the selected drawing tool
  };

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <GradientComponent />
      <ImageUploader onColorPicked={handleColorSelection} />
      <DrawingTools onSelectTool={handleToolSelection} />
      <ColorPalette onSelectColor={handleColorSelection} />
      <Canvas selectedColor={selectedColor} selectedTool={selectedTool} frames={frames} currentFrame={currentFrame} />
      <AnimationPanel frames={frames} setFrames={setFrames} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} />
    </div>
  );
};

export default App;
