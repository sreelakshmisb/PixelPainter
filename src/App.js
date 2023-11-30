// App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ColorPalette from './components/ColorPalette';
import DrawingTools from './components/DrawingTools';
import AnimationPanel from './components/AnimationPanel';
import Collaboration from './components/ColorPalette';
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
      <DrawingTools onSelectTool={handleToolSelection} />
      <ColorPalette onSelectColor={handleColorSelection} />
      <Canvas frames={frames} currentFrame={currentFrame} selectedTool={selectedTool} selectedColor={selectedColor} />
      
      
      <AnimationPanel frames={frames} setFrames={setFrames} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} />
      <Collaboration />
    </div>
  );
};

export default App;