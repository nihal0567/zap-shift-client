import React from 'react';
import authImg from '../assets/authImage.png'
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <Logo></Logo>
            <div className="flex items-center ">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1">
                    <img src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;