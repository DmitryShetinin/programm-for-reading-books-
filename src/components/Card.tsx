import { useCallback, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './crop.css';
import React from 'react';

export interface Dimensions {
  width: number;
  height: number;
}

export type CoordinateAndDimensions = {
  x: number;
  y: number;
} & Dimensions;

export interface Props {
  someInt: number;
  children: React.ReactNode;
  onCrop: (displayedVideoSize: Dimensions, selector: CoordinateAndDimensions) => void;
}

export const Card = (props: Props) => {
 
  const [{ x, y, width, height }, api] = useSpring(() => ({ x: 0, y: 0, width: 100, height: 100 }));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragEl = useRef<HTMLDivElement | null>(null);
  
  const bind = useDrag((state) => {
    const isResizing = (state.event.target === dragEl.current);
    if (isResizing) {
      api.set({
        width: state.offset[0],
        height: state.offset[1],
      });
    } else {
   
      api.set({
        x: state.offset[0],
        y: state.offset[1],
      });
    }
  }, {
    from: (event) => {
      const isResizing = (event.target === dragEl.current);
      return isResizing ? [width.get(), height.get()] : [x.get(), y.get()];
    },
 
  });



  

 
  return (
    <div className='container' ref={containerRef}>
      <div>
    
          <animated.div className='cropped-area' style={{ x, y, width, height }} {...bind()}>
            <div className='resizer' ref={dragEl}> 
              {props.someInt}
            </div>
          </animated.div>
   
        {props.children}
      </div>
   
    </div>
  );
};
