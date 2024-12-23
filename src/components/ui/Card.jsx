
import React from 'react';
import Button from './Button';
import Image from './Image';

const Card = ({children , className , title , subTitle}) => {
  return (
    <div className={`  bg-white   rounded-xl  ${className}`}>
      {title && <h1 className="flex justify-center">{title}</h1>}
      {subTitle && <h3 className=" flex justify-center ">{subTitle}</h3>}
{children}


      </div>
  );
};

Card.Image=Image ;
Card.Button=Button;


export default Card;

