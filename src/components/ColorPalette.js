import React, { useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import Button from '@mui/material/Button';

const ColorPalette = ({ onSelectColor }) => {
  const imageInputRef = useRef(null); 
  const [useGradient, setUseGradient] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Define the base color values for the gradients
  const baseColorsHorizontal = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#9900FF']; // Horizontal gradient colors
  const baseColorsVertical = ['#FFFFFF', '#000000']; // Vertical gradient colors (top to bottom)

  // Function to handle color selection
  const handleColorSelect = (event) => {
    // Get the size and position of the gradient container
    const gradientBox = event.currentTarget.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = gradientBox.width;
    canvas.height = gradientBox.height;

    // Draw the horizontal gradient
    const horizontalGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    baseColorsHorizontal.forEach((color, index) => {
      horizontalGradient.addColorStop(index / (baseColorsHorizontal.length - 1), color);
    });

    // Draw the vertical gradient
    const verticalGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    baseColorsVertical.forEach((color, index) => {
      verticalGradient.addColorStop(index / (baseColorsVertical.length - 1), color);
    });

    // Overlay the gradients
    ctx.fillStyle = horizontalGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = verticalGradient;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get the color data of the clicked position
    const x = event.clientX - gradientBox.left;
    const y = event.clientY - gradientBox.top;
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    
    // Convert the color to a hex string
    const color = tinycolor({ r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] }).toHexString();
    onSelectColor(color);
  };

  // Function to handle image upload and extract colors
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImageUrl(e.target.result);
        // Further processing if needed
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle between gradient and color picker
  const toggleMode = () => {
    setUseGradient(!useGradient);
  };

  // Style for the color palette gradient
  const gradientStyle = {
    background: `
      linear-gradient(to bottom, transparent, black), 
      linear-gradient(to right, ${baseColorsHorizontal.join(', ')})
    `,
    backgroundBlendMode: 'multiply',
    width: '100%',
    height: '200px',
    cursor: 'pointer',
    position: 'relative',
  };
  
  

  return (
    <div style={{ width: '50vw', display: 'flex', flexDirection: 'column', alignItems: 'center',  marginLeft: '10px' }}>
      {/* Toggle Button */}
      <Button onClick={toggleMode} variant="contained" style={{ marginBottom: '20px',  alignSelf : 'flex-start'}}>
        {useGradient ? 'Use Image Gradient' : 'Use Color Picker'}
      </Button>

      {/* Gradient color palette */}
      {useGradient && (
        <div style={gradientStyle} onClick={handleColorSelect}></div>
      )}

      {/* Render the color picker from an image if useGradient is false */}
      {!useGradient && (
        <div>
          <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} />
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
