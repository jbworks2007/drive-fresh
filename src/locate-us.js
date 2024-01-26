import React from 'react';
import { MapSection } from './component/mapsection';
import { Header } from './component/header';
import { Navigation } from './component/navbar';
import { Footer } from './component/footer';

export function Locate() {
    return (
      <div className='App'>
        <Header/>
        <Navigation/>
        <MapSection/>
        <Footer/>
      </div>
    );
  }