import React from 'react';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const Banner = () => {
  return (
    <div className='py-5 pb-20'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src={bannerImg1} alt="Banner 1" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bannerImg2} alt="Banner 2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bannerImg3} alt="Banner 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;