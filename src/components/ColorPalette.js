// ColorPalette.js
import React, { useRef, useState } from 'react';
import tinycolor from 'tinycolor2';

const ColorPalette = ({ onSelectColor }) => {
  const numSteps = 50; // Number of steps in the gradient (half of the original)

  const imageInputRef = useRef(null);
  const [useGradient, setUseGradient] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedCursorColor, setSelectedCursorColor] = useState('#000000'); // Initial cursor color

  // Define the base color values
  const baseColors = [
    '#FF0000', // Red
    '#FF9900', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#9900FF', // Purple
  ];

  // Function to handle color selection
  const handleColorSelect = (color) => {
    // Call the provided onSelectColor function from the parent component
    onSelectColor(color);
    // Set the selected color for the cursor
    setSelectedCursorColor(color);
  };

  // Function to generate a gradient of shades for a base color
  const generateShades = (baseColor) => {
    const color = tinycolor(baseColor);
    const shades = Array.from({ length: numSteps }, (_, index) =>
      color.clone().lighten((index / numSteps) * 100).toHexString()
    );
    return shades.slice(0, numSteps / 2); // Slice to get the first half
  };

  // Function to generate all shades for each base color
  const allShades = baseColors.map((baseColor) => generateShades(baseColor)).flat();

  // Function to handle image upload and extract colors
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          setUploadedImageUrl(e.target.result); // Set the uploaded image URL for rendering

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
          const colors = [];

          for (let i = 0; i < imageData.length; i += 4) {
            const rgba = [imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]];
            const hexColor = tinycolor(rgba).toHexString();
            colors.push(hexColor);
          }

          // Choose a subset of colors
          const selectedColors = colors.slice(0, numSteps / 2);

          // Update the color palette
          onSelectColor(selectedColors);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to handle cursor movement
  const handleMouseMove = (e) => {
    if (!useGradient) return;

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const x = e.clientX - cursor.clientWidth / 2;
    const y = e.clientY - cursor.clientHeight / 2;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  // Toggle between gradient and color picker
  const toggleMode = () => {
    setUseGradient(!useGradient);
  };

  return (
    <div
      style={{ width: '100vw' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setUseGradient(true)}
    >
 

      {/* Conditional rendering based on the selected mode */}
      {useGradient ? (
        // Render the gradient color palette
        allShades.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: `${100 / (numSteps / 2)}%`, // Equal width for each color step
              height: '30px',
              margin: '0',
              display: 'inline-block',
              border: 'none', // Remove the border between colors
            }}
            onClick={() => handleColorSelect(color)}
          ></div>
        ))
      ) : (
        // Render the color picker from an image
        <div>
          <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} />
          {/* Display the uploaded image */}
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
          )}
        </div>
      )}

      {/* Custom cursor for gradient mode */}
      {useGradient && (
        <div
          id="custom-cursor"
          style={{
            position: 'fixed',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: selectedCursorColor,
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default ColorPalette;
