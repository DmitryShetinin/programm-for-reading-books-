import React from 'react';
import './Card.css';


const Card = ({ title, price, imageSrc, altText, children }) => (
 
    <div className="card">
      
      <div className="card_content">
       фывфывфывфывфывфыв
      </div>
    </div>
   
 
);

const CardList = () => {
  return (
    <div className="main">
      
        <Card
          title="Farmstand Salad"
          price="$9"
          imageSrc="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg"
          altText="mixed vegetable salad in a mason jar."
        >
 
        </Card>

   
    </div>
  );
};

export default CardList;
