import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from './Card.tsx';




 


export default function Board() {
   
    return (
        
           <div> 
                <Card someInt={1}/> 
                <Card  someInt={2}/> 
           </div>
        
    );
}