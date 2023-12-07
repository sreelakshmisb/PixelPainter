import React, { useRef, useState } from 'react';
import tinycolor from 'tinycolor2';

const ColorPalette = ({ onSelectColor }) => {
  const numSteps = 50; // Number of steps in the gradient (half of the original)

  const imageInputRef = useRef(null);
  const [useGradient, setUseGradient] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [selectedCursorColor, setSelectedCursorColor] = useState('#000000'); // Initial cursor color
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });


  const baseColors = [
    '#FF0000', // Red
    '#FF9900', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#9900FF', // Purple
  ];


  const generateShades = (baseColor) => {
    const color = tinycolor(baseColor);
    return Array.from({ length: numSteps }, (_, index) =>
      color.clone().lighten((index / numSteps) * 100).toHexString()
    ).slice(0, numSteps / 2);
  };


  const allShades = baseColors.map((baseColor) => generateShades(baseColor)).flat();


  const handleColorSelect = (color) => {
    onSelectColor(color);
    setSelectedCursorColor(color);
  };


  const handleMouseMove = (e) => {
    if (!useGradient) return;


    const cursor = document.getElementById('custom-cursor');
    const imageInput = imageInputRef.current;


    if (cursor && imageInput) {
      const rect = imageInput.getBoundingClientRect();
      const x = e.clientX + window.scrollX - cursor.clientWidth / 2 - rect.left;
      const y = e.clientY + window.scrollY - cursor.clientHeight / 2 - rect.top;
      setCursorPosition({ x, y });
    }
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];


    if (file) {
      const reader = new FileReader();


      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;


        img.onload = () => {
          setUploadedImageUrl(e.target.result);
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


          const selectedColors = colors.slice(0, numSteps / 2);
          onSelectColor(selectedColors);


          const imageInputRect = imageInputRef.current.getBoundingClientRect();
          setCursorPosition((prev) => ({
            x: prev.x + imageInputRect.left,
            y: prev.y + imageInputRect.top,
          }));
        };
      };


      reader.readAsDataURL(file);
    }
  };


  return (
    <div
      style={{
        width: '50%',
        float: 'left',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setUseGradient(true)}
    >
      {useGradient ? (
        allShades.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: `${100 / (numSteps / 2)}%`,
              height: '30px',
              margin: '0',
              display: 'inline-block',
              border: 'none',
            }}
            onClick={() => handleColorSelect(color)}
          ></div>
        ))
      ) : (
        <div>
          <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} />
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
          )}
        </div>
      )}


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
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        ></div>
      )}
    </div>
  );
};


export default ColorPalette;
