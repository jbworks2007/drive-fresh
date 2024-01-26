import React from 'react';
import CarouselFadeExample from './component/carousel';
import { Footer } from './component/footer';
import { Header } from './component/header';
import { LowerSection } from './component/lowersec';
import { Navigation } from './component/navbar';
import { Section } from './component/section';

export function Home() {
  return (
    
    <div className="App">
        <Header/>
        <Navigation/>
        <CarouselFadeExample/>
        <Section/>
        <LowerSection/>
        <Footer/>
    </div>
  );
}