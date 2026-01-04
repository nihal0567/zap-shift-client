import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonStar from '../../../assets/brands/moonstar.png';
import randsSter from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import starPeople from '../../../assets/brands/start_people.png';

const brandsLogos = [
  amazon,
  amazonVector,
  casio,
  moonStar,
  randsSter,
  star,
  starPeople,
];

const Brands = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      centeredSlides={true}
    >
      {brandsLogos.map((logo, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <img src={logo} alt="brand"/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;