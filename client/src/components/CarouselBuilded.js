import React, { useState } from 'react';
import {Carousel} from 'react-bootstrap'
import image1 from '../images/happyNewYear.png';
import image2 from '../images/helloween.png';
import image3 from '../images/zfcbvsdfv2.png';

export const CarouselBuilded = () => {
    const navStyle = {
        width: '800px',
        margin: '0 auto'
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel 
            activeIndex={index}
            onSelect={handleSelect}
            style = {navStyle}
            className="rounded carousel">
            <Carousel.Item>
                <img
                    className="d-block rounded"
                    src={image1}
                    alt="First slide"
                    style = {navStyle}
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block rounded"
                    src={image2}
                    alt="Second slide"
                    style = {navStyle}
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block rounded"
                    src={image3}
                    alt="Third slide"
                    style = {navStyle}
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )

}
