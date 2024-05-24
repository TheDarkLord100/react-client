import React from 'react'
import houseImage from '../../assets/real.jpg';
import './home.css'

export default function Home() {
  return (
    <div className='landing'>
      <img src={houseImage} alt="House" />
    </div>
  );
}