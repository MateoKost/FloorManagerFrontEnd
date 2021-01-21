import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import '../LP.css';





//const coffee = process.env.PUBLIC_URL + '/Assets/coffee.jpg';
const wp = process.env.PUBLIC_URL + '/Assets/wp.jpg';

//const wp2 = process.env.PUBLIC_URL + '/Assets/wp2.jpg';
//const soldier = process.env.PUBLIC_URL + '/Assets/man.jpg';
const wood = process.env.PUBLIC_URL + '/Assets/wood.jpg';
//const creditCard = process.env.PUBLIC_URL + '/Assets/credit-card.jpg';
const banknote = process.env.PUBLIC_URL + '/Assets/banknote.jpg';
//const tool = process.env.PUBLIC_URL + '/Assets/tool.jpg';
//const coffee = render(<img src={ process.env.PUBLIC_URL + '/Assets/coffee.png' } /> );


const items = [
  {
    src: wp ,//<img src={ process.env.PUBLIC_URL + '/Assets/coffee.png' } />,
    altText: 'Slide 1',
    caption: 'Przeglądaj wyposażenie każdego pokoju',
    header: 'Zarządzaj izbami żołnierskimi',
  },
  {
    src: wood ,
    altText: 'alt Zleć naprawy zepsutego wyposażenia',
    header: 'Naprawa sprzętu',
    caption: 'Zleć naprawy zepsutego wyposażenia'
  },
  {
    src: banknote,
    altText: 'Slide 3',
    caption: 'Zapłać drogą eletroniczną za zlecone zamówienia',
    header: 'Płatność elektroniczna',
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