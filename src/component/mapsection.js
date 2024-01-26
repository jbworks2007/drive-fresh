import React from "react";
//import map from '../images/GoogleMapTA.webp';
import { InitGoogleMap } from "./map";

export function MapSection() {

    return(
        <>
            <div className="">
                <InitGoogleMap/><br></br>

            {/* <div className="row">
                <div className="mt-5 col-sm-4">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">ß
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Near Me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Search by National Park</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Search bt City</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                Content for Near Me
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                    </div>
                </div>
                <div className=" col-sm-8">
                    <InitGoogleMap/>
                    {/* <img className="map-section mt-5 mb-5" src={map} alt="map not found"/>
                </div>
            </div> 
            */}
        </div>
    
        </>
        
    )

}