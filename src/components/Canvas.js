import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import Toolbar from "./Toolbar"; 

const Canvas = ({ selectedColor, selectedTool }) => {
  
  const canvasSize = 30; // Can change the size of the canvas as needed
  const tableRef = useRef(null);

  //code to handle changign pixel size, within the canvas
  const pixelSizes = {
    small: 10,  // for example, 10x10 pixels
    medium: 20, // for example, 20x20 pixels
    large: 30,  // for example, 30x30 pixels
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [squareSize, setSquareSize] = useState('medium');
  const [animationInterval, setAnimationInterval] = useState(null);
  const animationSpeed = 1000; // Adjust the interval as needed

  //new/////
  const totalGridSize = 600; // Example size in pixels
  // Calculate the number of pixels that fit into the grid
  const numCols = Math.floor(totalGridSize / pixelSizes[squareSize]);
  const numRows = Math.floor(totalGridSize / pixelSizes[squareSize]);


  // const createEmptyCanvas = (size) => {
  //   return Array.from({ length: size / 2 }, () =>
  //     Array.from({ length: size * 2 }, () => ({ color: "white" }))
  //   );
  // };
    // Modify the createEmptyCanvas function to use numRows and numCols
  const createEmptyCanvas = (numRows, numCols) => {
    return Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => ({ color: "white" }))
    );
  };
  
  // State 1: Canvas with borders and gaps
  const [originalPixels, setOriginalPixels] = useState(createEmptyCanvas(numRows, numCols));

  // State 2: Canvas without borders and gaps
  const [currentPixels, setCurrentPixels] = useState(createEmptyCanvas(numRows, numCols));

  const totalGridPixels = 600; 

  useEffect(() => {
    const pixelSize = pixelSizes[squareSize];
    const newNumCols = Math.floor(totalGridPixels / pixelSize);
    const newNumRows = Math.floor(totalGridPixels / pixelSize);

    // Adjust to fit exactly into totalGridPixels
    const adjustedTotalWidth = newNumCols * pixelSize;
    const adjustedTotalHeight = newNumRows * pixelSize;

    setCurrentPixels(createEmptyCanvas(newNumRows, newNumCols));
    setTableStyle({
      ...tableStyle,
      width: `${adjustedTotalWidth}px`,
      height: `${adjustedTotalHeight}px`
    });
  }, [squareSize]);

  const [tableStyle, setTableStyle] = useState({
    userSelect: "none",
    tableLayout: "fixed",
    marginTop: "20px",
    // Initial width and height set to totalGridPixels
    width: `${totalGridPixels}px`,
    height: `${totalGridPixels}px`
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center',    // Center children horizontally
    justifyContent: 'flex-start', // Align children to the top
    width: '100%',           // Full width
    maxWidth: '1200px',      // Maximum width of the container
    margin: '0 auto',        // Center the container on the page
  };
  
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space items evenly
    width: '100%',                   // Full width of its container
    padding: '10px 0',               // Padding at the top and bottom
  };
  
  useEffect(() => {
    const newNumCols = Math.floor(totalGridSize / pixelSizes[squareSize]);
    const newNumRows = Math.floor(totalGridSize / pixelSizes[squareSize]);
  
    // Create a new canvas while trying to maintain the color state
    const newCanvas = Array.from({ length: newNumRows }, (v, rowIndex) =>
      Array.from({ length: newNumCols }, (w, colIndex) => {
        // Try to get the color from the corresponding pixel in the old canvas
        const oldRow = Math.floor(rowIndex * (canvasSize / newNumRows));
        const oldCol = Math.floor(colIndex * (canvasSize / newNumCols));
        return originalPixels[oldRow]?.[oldCol] || { color: "white" };
      })
    );
  
    setOriginalPixels(newCanvas);
    setCurrentPixels(newCanvas);
  }, [squareSize]);
  

  const actualPixelSize = pixelSizes[squareSize];

  const handlePixelClick = (rowIndex, colIndex) => {
    const updatePixels = (color) => {
      const updatedOriginalPixels = originalPixels.map((row, ri) =>
        row.map((pixel, ci) => {
          if (ri === rowIndex && ci === colIndex) {
            return { ...pixel, color: color };
          }
          return pixel;
        })
      );
  
      setOriginalPixels(updatedOriginalPixels);
      setCurrentPixels(updatedOriginalPixels);
    };
  
    if (selectedTool === "pencil") {
      updatePixels(selectedColor);
    } else if (selectedTool === "eraser") {
      updatePixels("white");
    }
  };
  

  const handleMouseDown = () => {
    if (isPlaying) {
      handleAnimation();
    } else {
      setIsDrawing(true);
    }
  };

  const handleMouseUp = () => {
    if (isPlaying) {
      stopAnimation();
    } else {
      setIsDrawing(false);
    }
  };

  const handleAnimation = () => {
    setAnimationInterval(
      setInterval(() => {
        setCurrentPixels((prevPixels) =>
          prevPixels.map((row) => row.slice(1).concat(row.slice(0, 1)))
        );
      }, animationSpeed)
    );
    setIsPlaying(true);
  };

  const stopAnimation = () => {
    clearInterval(animationInterval);
    setAnimationInterval(null);
    setIsPlaying(false);
  };

  const saveCanvas = () => {
    setCurrentPixels((prevPixels) => [...prevPixels]);

    tableRef.current.style.borderCollapse = "collapse";
    tableRef.current.querySelectorAll("td").forEach((td) => {
      td.style.border = "none";
      td.style.padding = "0";
    });

    html2canvas(tableRef.current, { scale: 2 }).then((canvas) => {
      tableRef.current.style.borderCollapse = "";
      tableRef.current.querySelectorAll("td").forEach((td) => {
        td.style.border = "1px solid #ccc";
        td.style.padding = "";
      });

      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "my-grid-canvas.png";
      link.href = image;
      link.click();
    });
  };

  const clearCanvas = () => {
    const clearedPixels = currentPixels.map(row =>
      row.map(() => ({ color: "white" }))
    );
    setOriginalPixels(clearedPixels);
    setCurrentPixels(clearedPixels);
  };

  return (
    <div style ={containerStyle}>
      <Toolbar
        squareSize={squareSize}
        setSquareSize={setSquareSize}
        saveCanvas={saveCanvas}
        clearCanvas={clearCanvas}
        isPlaying={isPlaying}
        stopAnimation={stopAnimation}
        handleAnimation={handleAnimation}
        style ={toolbarStyle}
      />

      <table
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        //style={{ userSelect: "none", width: "100%", marginTop: "20px" }}
        style={tableStyle}
      >
        <tbody>
          {currentPixels.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((pixel, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    width: `${actualPixelSize}px`,
                    height: `${actualPixelSize}px`,
                    backgroundColor: pixel.color,
                    border: "1px solid #ccc",
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
    </div>
  );
};

export default Canvas;


