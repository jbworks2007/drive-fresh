import React from "react";
import bg1 from '../images/rodion.png';
import logo1 from '../images/drive-fresh.png';
import { Carousel2 } from "./carousel2";

export function LowerSection() {

    return (
        <>
            <div className="mt-5 container-fluid " 
                style={{backgroundImage: `url(${bg1}`}} 
            >
                <div className="mt-5 col-sm-12 col-lg-12">
            
                    <img className="mt-5" src={logo1} alt="drive-fresh.logo"/>
                    {/* <h2 className=" mt-3 text-light"></h2> */}
                    <h2 className="text-greenyellow">DRIVE FRESH</h2>
                    <div className="row">
                        <div className="col-sm-4">

                        </div>
                        <div className="mt-3 col-sm-4 text-light">
                            <p>
                            Upgradation of Toliet Facilities<br></br>
                            <span className="text-greenyellow">at OMC Retail Outlets</span><br></br>
                            <span className="text-greenyellow">Along Tourist Routes - National Parks</span>
                            </p>        
                        </div>
                        <div className="col-sm-4">
                            
                        </div>
                    </div>
                    
                    <Carousel2/>
                    <br></br><br></br>
                    <a type="button" className="mt-2 btn btn-primary" href="../locate-us">Locate us</a>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            
            
            </div>
        </>
    )
}