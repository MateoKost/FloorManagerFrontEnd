import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './LP.css';
const wood = process.env.PUBLIC_URL + '/Assets/wood.jpg';
const banknote = process.env.PUBLIC_URL + '/Assets/banknote.jpg';
const office = process.env.PUBLIC_URL + '/Assets/office.jpg';

const items = [
  {
    src: office,//<img src={ process.env.PUBLIC_URL + '/Assets/coffee.png' } />,
    altText: 'Slide 1',
    caption: <span class="ke">Zarządzaj pomieszczeniami służbowymi firmy</span>,
    header: <span class="ke">Przegląd wyposażenia pokoi</span>,
  },
  {
    src: wood ,
    altText: 'alt Zleć naprawy zepsutego wyposażenia',
    header: <span class="ke">Naprawa sprzętu</span>,
    caption: <span class="ke">Zleć naprawy zepsutego wyposażenia</span>
  },
  {
    src: banknote,
    altText: 'Slide 3',
    caption: <span class="ke">Zapłać drogą eletroniczną za zlecone zamówienia</span>,
    header: <span class="ke">Płatność elektroniczna</span>,
  }
];

const AutoSlider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block w-100 croppedImg" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.header} className="LPSliderCaption" />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default AutoSlider;