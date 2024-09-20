import React, { useEffect, useRef, useState } from "react";
import "./Board.css";
import { Card } from "../Card/Card.tsx";



export default function App() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [isClick, setIsClick] = useState(false);


  const ClickCardUp = () =>{
    setIsClick(false);
  }

  const ClickCardDown = () =>{
    setIsClick(true);
  }


  const [viewport, setViewport] = useState({
    offset: {
      x: 0.0,
      y: 0.0
    },
    zoom: 1
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }

    if (isClick) {
      setIsDragging(false);
      return;
    }


    if (e.buttons !== 1) {
      setIsDragging(false);
      return;
    }

  

    setViewport((prev) => ({
      ...prev,
      offset: {
        x: prev.offset.x + e.movementX / viewport.zoom,
        y: prev.offset.y + e.movementY / viewport.zoom
      }
    }));
  };

  useEffect(() => {
    if (!layerRef.current) {
      return;
    }

    layerRef.current.onwheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey) {
        const speedFactor =
          (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * 10;

        setViewport((prev) => {
          const pinchDelta = -e.deltaY * speedFactor;

          return {
            ...prev,
            zoom: Math.min(
              1.3,
              Math.max(0.1, prev.zoom * Math.pow(2, pinchDelta))
            )
          };
        });
      }
    };
  }, [setViewport]);

  

  return (
    <div
      className="app"
      ref={layerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="container">
        <div
          className="nodes-container"
          style={{
            transform: `translate(${viewport.offset.x * viewport.zoom}px, ${
              viewport.offset.y * viewport.zoom
            }px) scale(${viewport.zoom})`
          }}
        >
         <Card  onMouseUp={ClickCardUp} onMouseDown={ClickCardDown} />
       
         <Card  onMouseUp={ClickCardUp} onMouseDown={ClickCardDown} />
           
           
        </div>
      </div>
    </div>
  );
}
