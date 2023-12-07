import React, { useState } from "react";
import { useDropzone } from "react-dropzone"; // has to be installed

const ImageUploader = ({ onColorPicked }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {Tem
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const pickColor = (e) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const pixel = context.getImageData(x, y, 1, 1).data;

      const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      setPickedColor(color);
      onColorPicked(color); // Pass the picked color to the parent component
    };

    img.src = imageSrc;
  };

  return (
    <div style={uploaderContainerStyle}>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      {imageSrc && (
        <div>
          <div style={imageContainerStyle}>
            <img
              src={imageSrc}
              alt="Uploaded"
              style={imageStyle}
              onClick={pickColor}
            />
          </div>
          {pickedColor && (
            <p>
              Picked Color:{" "}
              <span style={{ color: pickedColor }}>{pickedColor}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const uploaderContainerStyle = {
  width: "48%", // Set the width to 50% for the right half
  float: "right", // Float to the right
  padding: "20px",
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageContainerStyle = {
  maxWidth: "400px",
  maxHeight: "300px",
  overflow: "hidden",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  cursor: "crosshair",
};

export default ImageUploader;
