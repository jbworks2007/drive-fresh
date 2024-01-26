import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {

    return(
        <>
            <div className="container-fluid bg-footer ">
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <p className="mt-3 text-light">
                            2022 © Bharat Petroleum Corporation Limited All Rights Reserved.<br></br>
                        </p>
                    </div>
                    <div className="mb-2 col-sm-12 col-lg-6">
                        <a href="https://m.facebook.com/BharatPetroleumcorporation/" target="_blank">
                            <FaFacebook size={28} className="mt-3 mb-2 text-light "/>
                        </a>&nbsp;&nbsp;
                        <a href="https://youtube.com/c/BPCLIndia" target="_blank">
                            <FaYoutube size={28} className="mt-3 mb-2 text-light "/>
                        </a>&nbsp;&nbsp;
                        <a href="https://www.linkedin.com/company/bpcl/" target="_blank">
                            <FaLinkedin size={28} className="mt-3 mb-2 text-light "/>
                        </a>&nbsp;&nbsp;
                        <a href="https://twitter.com/BPCLimited" target="_blank">
                            <FaTwitter size={28} className="mt-3 mb-2 text-light "/>
                        </a>&nbsp;&nbsp;
                        <a href="https://instagram.com/bpclimited?igshid=YmMyMTA2M2Y=" target="_blank">
                            <FaInstagram size={28} className="mt-3 mb-2 text-light "/>
                        </a>&nbsp;&nbsp;
                    </div>
                </div>
            </div>
        </>
    )
}