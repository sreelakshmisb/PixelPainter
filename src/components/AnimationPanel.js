// AnimationPanel.js
import React, { useState, useEffect } from 'react';

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
      <button onClick={playAnimation}>Play</button>
      <button onClick={stopAnimation}>Stop</button>
      <button onClick={addFrame}>Add Frame</button>
      <p>Current Frame: {currentFrame + 1}</p>
    </div>
  );
};

export default AnimationPanel;
