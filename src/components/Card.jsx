import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useState, useRef } from "react";
 
import styled from "styled-components";
import { Avatar } from "antd";

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 5px 5px 5px 2px grey;
    padding: 8px;
    color: #000;
    margin-bottom: 8px;
 

    cursor: pointer;
    background-color: ${props => props.isDragging ? 'lightgreen' : '#EAF4FC'}; 
    display: inline-block;
  `
;


const Icons = styled.div`
    display: flex;
    justify-content: end;
    padding: 2px;
`;

const TextContent = styled.div`
    display: inline-block;  
    max-width: 300px;  
    padding: 8px;
    box-sizing: border-box;
    overflow-wrap: break-word;  
    word-wrap: break-word; 
    
`;

 


export default function Card() {
  

  const [isDragging, setIsDragging] = useState(false);

  const onDrag = () => {
    setIsDragging(true);
  };

  const onStop = () => {
    setIsDragging(false);
  };


  return (
    <Draggable onStop={onStop} onDrag={onDrag}>
      <Container  isDragging={isDragging} >
                <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                      <small> #{1} </small>   
                </div>   
                  <TextContent>              
                    {"asdasdasdasasdasdasdasasdasdasdasasdasdasdasasdasdasdas"} 
                  </TextContent>
                    <Icons>
                        <div>
                            <Avatar
                                onClick={() => console.log(1)}
                                src={"https://joesch.moe/api/v1/random?key=" + 1}
                            />
                        </div>
                    </Icons>
                  
                </Container>
    </Draggable>
  );
};
