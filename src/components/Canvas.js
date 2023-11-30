// Canvas.js
import React, { useState } from 'react';
import {useRef, useEffect} from 'react';
import html2canvas from 'html2canvas';

const Canvas = ({ selectedColor, selectedTool }) => {
  const canvasSize = 30; // Change the size of the canvas as needed
  const [pixels, setPixels] = useState(createEmptyCanvas(canvasSize));
  const [isDrawing, setIsDrawing] = useState(false);
  
  const tableRef = useRef(null);
  
  //function to save canvas
  const saveCanvas = () => {
    html2canvas(tableRef.current).then(canvas => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'my-grid-canvas.png';
      link.href = image;
      link.click();
    });
  };

  const clearCanvas = () => {
    const clearedPixels = createEmptyCanvas(canvasSize); // Assuming canvasSize is defined
    setPixels(clearedPixels);
  };

  // Function to create an empty canvas
  function createEmptyCanvas(size) {
    const emptyCanvas = [];
    for (let i = 0; i < size/2; i++) {
      const row = [];
      for (let j = 0; j < size*2; j++) {
        row.push({ color: 'white' }); // Initialize with a default color
      }
      emptyCanvas.push(row);
    }
    return emptyCanvas;
  }

  // Function to handle pixel click and change its color
  const handlePixelClick = (rowIndex, colIndex) => {
    if (selectedTool === 'pencil') {
      const updatedPixels = [...pixels];
      updatedPixels[rowIndex][colIndex].color = selectedColor;
      setPixels(updatedPixels);
    }
    else if (selectedTool === 'eraser') {
        const updatedPixels = [...pixels];
        updatedPixels[rowIndex][colIndex].color = 'white'; // Set to the default color or any desired color for eraser
        setPixels(updatedPixels);
      }
    // Add other drawing tools logic here if needed
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Add functions to draw, erase, fill, etc.

  return (
    <div>
      {/* Render the grid-based canvas here */}
      <table
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: 'none' }} // Disable text selection on drag
      >
        <tbody>
          {pixels.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((pixel, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: pixel.color,
                    border: '1px solid #ccc',
                  }}
                  onMouseOver={() => {
                    if (isDrawing) {
                      handlePixelClick(rowIndex, colIndex);
                    }
                  }}
                  onClick={() => handlePixelClick(rowIndex, colIndex)}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveCanvas}>Save</button>
      <button onClick={clearCanvas}>Reset</button>
    </div>
  );
};

export default Canvas;