// AnimationPanel.js
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';

const AnimationPanel = () => {
  const [frames, setFrames] = useState([]); // State to store animation frames
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
  };

  const addFrame = () => {
    const newFrames = [...frames, /* New frame data */];
    setFrames(newFrames);
  };

  useEffect(() => {
    let animationInterval;

    const handleAnimation = () => {
      animationInterval = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
      }, 1000); // Adjust the interval as needed
    };

    if (isPlaying) {
      handleAnimation();
    } else {
      clearInterval(animationInterval);
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [isPlaying, frames]);

  return (
    <div>
        <Box sx= {{
        my: 2, 
        display: 'flex', // Use flexbox for inline elements
        gap: 2, // Add space between the buttons
        justifyContent: 'center', // Center align the buttons horizontally
        alignItems: 'center' // Center align the buttons vertically
        }}>
          <Button onClick={playAnimation} variant="contained">Play</Button>
          <Button onClick={stopAnimation} variant="contained">Stop</Button>
          <Button onClick={addFrame} variant="contained">Add Frame</Button>
        </Box>
        <p>Current Frame: {currentFrame + 1}</p>
    </div>
  );
};

export default AnimationPanel;
