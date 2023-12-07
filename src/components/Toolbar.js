import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DrawingTools from './DrawingTools';

const Toolbar = ({
  squareSize,
  setSquareSize,
  saveCanvas,
  clearCanvas,
  isPlaying,
  stopAnimation,
  handleAnimation,
  onSelectTool, // Function to handle tool selection
}) => {
  const handleSquareSizeChange = (e) => {
    setSquareSize(e.target.value);
  };

  return (
    <div>
      <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {/* Pixel size input */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <label style={{fontWeight: 'bold'}}>
            Pixel Size:&nbsp;  
            <select
              value={squareSize}
              onChange={(e) => handleSquareSizeChange(e)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </Box>

        {/* Save and Reset buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={saveCanvas} variant="contained">Save</Button>
          <Button onClick={clearCanvas} variant="contained">Reset</Button>
          <Button variant="contained" onClick={isPlaying ? stopAnimation : handleAnimation}>
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </Box>
      </Box>

    </div>
  );
};

export default Toolbar;

