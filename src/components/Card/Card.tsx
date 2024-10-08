import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
 
import CardDesigner from './CardDesigner';

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
  onMouseUp: () => void; 
  onMouseDown: () => void; 

}

export const Card = (props: Props) => {
  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    width: 300,
    height: 300,
  }));

  const dragEl = useRef<HTMLDivElement | null>(null);
const inputTitle = useRef<HTMLInputElement | null>(null);

const bind = useDrag((state) => {
  const isResizing = state.event.target === dragEl.current;
  const isClickOnInput = state.event.target === inputTitle.current;
  if (isClickOnInput) return false;

  if (isResizing) {
    const newWidth = Math.max(0, state.offset[0]);
    const newHeight = Math.max(0, state.offset[1]);
   
    api.set({
      width: newWidth,
      height: newHeight,
    });
  } else {
    api.set({
      x: state.offset[0],
      y: state.offset[1],
    });
  }
}, {
  from: (event) => {
    const isResizing = event.target === dragEl.current;
    return isResizing ? [width.get(), height.get()] : [x.get(), y.get()];
  },
});

  return (
    <div>
      <animated.div
        className='cropped-area'
        style={{ x, y, width, height }}
        {...bind()}
        onMouseUp={props.onMouseUp} 
        onMouseDown={props.onMouseDown}
      >
        <CardDesigner/>
        <div className='resizer' ref={dragEl} />   
      </animated.div>
    </div>
  );
};