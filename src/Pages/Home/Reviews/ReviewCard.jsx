import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const {user_photoURL, userName,review:rviews } = review
    return (
        <div className="card bg-white shadow-md rounded-2xl max-w-md">
            <div className="card-body p-6">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-4xl text-teal-200 mb-4" />

                {/* Text */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {rviews}
                </p>

                {/* Divider */}
                <div className="border-t border-dashed border-teal-400 my-6"></div>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-800 flex items-center  justify-center text-white font-semibold">
                        <img src={user_photoURL} alt=""  className='rounded-full'/>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-800">
                            {userName}
                        </h4>
                        <p className="text-xs text-gray-500">
                            Senior Product Designer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;