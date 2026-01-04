import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../Banner/OurServices';
import Brands from '../Banner/Brands';
import Reviews from '../Reviews/Reviews';


const reviewsPromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* <OurServices></OurServices> */}
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;