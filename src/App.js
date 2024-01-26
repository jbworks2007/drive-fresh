import React from "react";
import "./App.css";
import "./asset/map.css";
// import CarouselFadeExample from './component/carousel';
// import { Footer } from './component/footer';
// import { Header } from './component/header';
// import { LowerSection } from './component/lowersec';
// import { Navigation } from './component/navbar';
// import { Section } from './component/section';
import { Home } from "./home";
import { Locate } from "./locate-us";
import { Support } from "./support";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Details } from "./details";

// import Router from 'react-router-dom';
// import Switch from 'react-dom';
// import Routes from 'react-router-dom';
// import Route from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locate-us" element={<Locate />}/>
          <Route path="/support" element={<Support />}/>
          <Route path="/details" element={<Details />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
