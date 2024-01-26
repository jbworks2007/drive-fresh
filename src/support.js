import React from "react";
import { Header } from "./component/header";
import { Navigation } from "./component/navbar";
import logo1 from "./images/logos/Bharat_Petroleum_Logo.svg.png";
import logo2 from "./images/logos/Indian_Oil_Logo.svg.png";
import logo3 from "./images/logos/Hindustan_Petroleum_Logo.svg.png";
import { Footer } from "./component/footer";

export function Support() {

    return(
        <div className="text-center">
            <Header/>
            <Navigation/>
            <div className="container">
                <h3 className="mt-5 text-blue">Support</h3>
                <div className="mt-5  container wide-card col-lg-6">
                    <div className="row col-sm-12">
                        <div className="col-3">
                            <img className=" py-2 img-fluid" src={logo1} alt="no image founf"></img>
                        </div>
                        <div className="mt-2 col-lg-9 text-left">
                            <p><b>Bharat Petroleum</b><br></br>
                                India’s ‘best performing’ Maharatna Public Sector Undertaking, and its journey from being an Oil and Gas Company in India to a Fortune 500 oil refining, exploration and marketing conglomerate.
                                <br></br><a target="_blank" href="https://www.bharatpetroleum.in/">https://www.bharatpetroleum.in</a>  
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5  container wide-card col-lg-6">
                    <div className="row col-sm-12">
                        <div className="col-3">
                            <img className=" py-2 img-fluid" src={logo2} alt="no image founf"></img>
                        </div>
                        <div className="mt-2 col-lg-9 text-left">
                            <p><b>Indian Oil Corporation Limited</b><br></br>
                                Integrated energy major with presence in almost all the streams of oil, gas, petrochemicals and alternative energy sources; a world of high-calibre people, state-of-the-art technologies and cutting-edge R&D
                                <br></br><a target="_blank" href="https://iocl.com">https://iocl.com</a>  
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5  container wide-card col-lg-6">
                    <div className="row col-sm-12">
                        <div className="col-3">
                            <img className=" py-2 img-fluid" src={logo3} alt="no image founf"></img>
                        </div>
                        <div className="mt-2 col-lg-9 text-left">
                            <p><b>Hindustan Petroleum Corporation Limited</b><br></br>
                                World Class Energy Company known for caring and delighting the customers with high quality products and innovative services across domestic and international markets with aggressive growth and delivering superior financial performance
                                <br></br><a target="_blank" href="https://www.hindustanpetroleum.com/">https://www.hindustanpetroleum.com/</a>  
                            </p>
                        </div>
                    </div>
                </div>
            </div><br></br><br></br>
            <Footer/>
        </div>
    )
}