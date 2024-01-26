import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../asset/style.css';
import img1 from '../images/slider/01.png';
import img2 from '../images/slider/02.png';
import img3 from '../images/slider/03.png';
import img4 from '../images/slider/04.png';
//import gif1 from '../images/gif/01.gif';

function CarouselFadeExample() {
  return (
    <Carousel fade>

      <Carousel.Item>
        
        
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
            <h1 className='text-antwhite'>
                <span className='text-green'>Drive Fresh</span>&nbsp;an Initiative by Ministry of Petroleum and Natural Gas and Ministry of Tourism.
            </h1>            
        </Carousel.Caption>
        
          
        
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption>
            <h1 className='text-antwhite'>
                <span className='text-green'>Drive Fresh</span>&nbsp;an Initiative by Ministry of Petroleum and Natural Gas and Ministry of Tourism.
            </h1>            
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />

        <Carousel.Caption>
            <h1 className='text-antwhite'>
                <span className='text-green'>Drive Fresh</span>&nbsp;an Initiative by Ministry of Petroleum and Natural Gas and Ministry of Tourism.
            </h1>            
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img4}
          alt="Third slide"
        />

        <Carousel.Caption>
            <h1 className='text-antwhite'>
                <span className='text-green'>Drive Fresh</span>&nbsp;an Initiative by Ministry of Petroleum and Natural Gas and Ministry of Tourism.
            </h1>            
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default CarouselFadeExample;