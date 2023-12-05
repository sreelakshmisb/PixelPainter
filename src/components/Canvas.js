import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const Canvas = ({ selectedColor, selectedTool }) => {
  const canvasSize = 30; // Change the size of the canvas as needed

  // State 1: Canvas with borders and gaps
  const [originalPixels, setOriginalPixels] = useState(createEmptyCanvas(canvasSize));

  // State 2: Canvas without borders and gaps
  const [currentPixels, setCurrentPixels] = useState(createEmptyCanvas(canvasSize));

  const [isDrawing, setIsDrawing] = useState(false);
  const tableRef = useRef(null);

  // State for square size
  const [squareSize, setSquareSize] = useState(20);

  useEffect(() => {
    // Reset the canvas with borders and gaps after the image is saved
    setOriginalPixels((prevPixels) => [...prevPixels]);
  }, [currentPixels]);

  const clearCanvas = () => {
    // Clear both states
    setOriginalPixels(createEmptyCanvas(canvasSize));
    setCurrentPixels(createEmptyCanvas(canvasSize));
  };

  // Function to create an empty canvas
  function createEmptyCanvas(size) {
    const emptyCanvas = [];
    for (let i = 0; i < size / 2; i++) {
      const row = [];
      for (let j = 0; j < size * 2; j++) {
        row.push({ color: 'white' }); // Initialize with a default color
      }
      emptyCanvas.push(row);
    }
    return emptyCanvas;
  }

  // Function to handle pixel click and change its color
  const handlePixelClick = (rowIndex, colIndex) => {
    if (selectedTool === 'pencil') {
      const updatedOriginalPixels = [...originalPixels];
      updatedOriginalPixels[rowIndex][colIndex].color = selectedColor;
      setOriginalPixels(updatedOriginalPixels);

      const updatedCurrentPixels = [...currentPixels];
      updatedCurrentPixels[rowIndex][colIndex].color = selectedColor;
      setCurrentPixels(updatedCurrentPixels);
    } else if (selectedTool === 'eraser') {
      const updatedOriginalPixels = [...originalPixels];
      updatedOriginalPixels[rowIndex][colIndex].color = 'white';
      setOriginalPixels(updatedOriginalPixels);

      const updatedCurrentPixels = [...currentPixels];
      updatedCurrentPixels[rowIndex][colIndex].color = 'white';
      setCurrentPixels(updatedCurrentPixels);
    }
    // Add other drawing tools logic here if needed
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      {/* Render the grid-based canvas here */}
      <table
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: 'none', width: '100%' }} // Occupy the width of the screen
      >
        <tbody>
          {currentPixels.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((pixel, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: `${squareSize}px`,
                    height: `${squareSize}px`,
                    backgroundColor: pixel.color,
                    border: '1px solid #ccc', // Set default border for current state
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
      <label>
        Square Size:
        <input
          type="number"
          value={squareSize}
          onChange={(e) => setSquareSize(Math.max(1, parseInt(e.target.value, 10)))}
        />
      </label>
      <button onClick={clearCanvas}>Reset</button>
    </div>
  );
};

export default Canvas;
