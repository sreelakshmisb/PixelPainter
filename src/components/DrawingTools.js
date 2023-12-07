import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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

  // Tool buttons data
  const toolButtons = [
    { tool: 'pencil', label: 'Pencil' },
    { tool: 'eraser', label: 'Eraser' },
  ];

  return (
    <Box sx={{ my: 2 }}>
      {toolButtons.map(({ tool, label }) => (
        <Button
          key={tool}
          variant="contained"
          onClick={() => handleToolSelect(tool)}
          disabled={selectedTool === tool} // Disabling the button if it's already selected
        >
          {selectedTool === tool ? `Selected: ${label}` : label}
        </Button>
      ))}
    </Box>
  );
};

export default DrawingTools;



