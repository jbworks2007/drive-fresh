import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../images/carousel/01.png';
import img2 from '../images/carousel/02.png';
import img3 from '../images/carousel/03.png';
import img4 from '../images/carousel/04.png';
  
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  export function Carousel2() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-lg-2'>

                </div>
                <div className='col-sm-12 col-lg-8'>

                <Carousel responsive={responsive}>
                    <div>
                        <img className='fit' src={img1} alt="image1"/> 
                    </div>
                    <div>
                        <img className='fit' src={img2} alt="image2"/>
                    </div>
                    <div>
                        <img className='fit' src={img3} alt="image3"/>
                    </div>
                    <div>
                        <img className='fit' src={img4} alt="image4"/>
                    </div>
                    <div>
                        <img className='fit' src={img1} alt="image5"/>
                    </div>
                    <div>
                        <img className='fit' src={img2} alt="image6"/>
                    </div>
                    <div>
                        <img className='fit' src={img3} alt="image7"/>
                    </div>
                </Carousel>            
                </div>
                <div className='col-sm-12 col-lg-2'>
                    
                </div>
            </div>
        </div>
        
    )
  }
  

