import React from 'react';
import { MapSection } from './component/mapsection';
import { Header } from './component/header';
import { Navigation } from './component/navbar';
import { Footer } from './component/footer';
import { DetailSection } from './component/detailsection';

export function Details(props) {
    return (
      <div className='App'>
        {/* <Header/>
        <Navigation/> */}
        <DetailSection {...props}/>
        {/* <MapSection/> */}
        {/* <Footer/> */}
      </div>
    );
}