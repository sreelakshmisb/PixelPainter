// DrawingTools.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';




const DrawingTools = ({ onSelectTool }) => {
  const [selectedTool, setSelectedTool] = useState('pencil'); // Default tool

  // Function to handle tool selection
  const handleToolSelect = (tool) => {
    // Check if onSelectTool is a function before calling it
    if (typeof onSelectTool === 'function') {
      setSelectedTool(tool);
      onSelectTool(tool);
    } else {
      console.error('onSelectTool is not a function');
    }
  };

  return (
    <Box sx={{ my: 2 }}>
        (
            <Button 
            variant="contained"
            onClick={() => handleToolSelect('pencil')}
            >
            Pencil
            </Button>
            <Button 
            variant="contained"
            onClick={() => handleToolSelect('eraser')}
            >
            Eraser
            </Button>
        )
    </Box>
    // <div>
    //   {/* Render drawing tools here */}
      

    //   <button onClick={() => handleToolSelect('line')}>Line</button>
    //   <button onClick={() => handleToolSelect('circle')}>Circle</button>
    //   <button onClick={() => handleToolSelect('rectangle')}>Rectangle</button>
    //   {/* Add more tools as needed */}
    // </div>
  );
};

export default DrawingTools;