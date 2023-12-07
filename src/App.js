import React, { useState } from "react";
import Canvas from "./components/Canvas";
import ImageUploader from "./components/ImageUploader";
import ColorPalette from "./components/ColorPalette";
import GradientComponent from "./components/GradientComponent";
import DrawingTools from "./components/DrawingTools";
const App = () => {
const [selectedTool, setSelectedTool] = useState("pencil");
const [selectedColor, setSelectedColor] = useState("black");
const handleColorSelection = (color) => {
setSelectedColor(color);
};
return (
    <>
    <GradientComponent />
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}> 
      <DrawingTools onSelectTool={setSelectedTool} />
      <ImageUploader onColorPicked={handleColorSelection} />
      <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}> {/* This div wraps the Color Palette header */}
        <h2>Color Palette</h2>
      </div>
      <ColorPalette onSelectColor={handleColorSelection} />
      <Canvas 
          selectedColor={selectedColor} 
          selectedTool={selectedTool} 
      /> 
    </div>
    </>
  );
};
export default App;