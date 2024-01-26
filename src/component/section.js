import React from "react";
import svg1 from '../images/wild.svg';

export function Section() {

    return (
        <>
            <div className="mt-5 container col-sm-12 col-lg-10"
            style={{backgroundImage: `url(${svg1}`}} 
            >
            <h2 className="text-blue"><b><u>Drive Fresh</u></b></h2>
            <h4 className="mt-3">    
                Upgradation of Toilet Facilities at OMC Retail Outlets along tourist routes - National Parks 
            </h4>
            <p className="mt-3 text-justify" style={{fontSize: "20px"}}>
                National Parks and Wildlife Sanctuaries in the country are very popular driving 
                destinations and are frequented by both domestic and international tourists 
                travelling in personal vehicles and in tourist buses. OMC retail outlets enroute 
                to the National Parks and Wildlife sanctuaries are important halting points for 
                refueling and for use of amenities like toilets. <br></br><br></br> 
                OMCs have now taken up upgradation of toilets in 75 retail outlets by each OMC (total 225 retail outlets)
                enroute to major National Parks (to be selected from amongst the 103 National Parks in the country) 
                from the main traffic originating cities/towns under the Azadi ka Amrit Mahotsav campaign 
                for the convenience of the tourists and travelers and in order to provide an enhanced customer experience. 
            </p>
            </div>
            
        </>
    )
}