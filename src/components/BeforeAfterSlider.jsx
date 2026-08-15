import React, { useState } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="slider-container" style={{ position: 'relative' }}>
      {/* After Image (Background) */}
      <div 
        className="slider-image slider-after" 
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      
      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="slider-image slider-before" 
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          width: `${sliderPosition}%` 
        }}
      />
      
      {/* Slider Bar & Handle Button */}
      <div 
        className="slider-handle-bar" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle-button">
          &#8596;
        </div>
      </div>
      
      {/* Range Input (Invisible overlay for controls) */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={handleSliderChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'ew-resize',
          zIndex: 4
        }}
      />

      <span className="slider-label label-before">{beforeLabel}</span>
      <span className="slider-label label-after">{afterLabel}</span>
    </div>
  );
};

export default BeforeAfterSlider;
