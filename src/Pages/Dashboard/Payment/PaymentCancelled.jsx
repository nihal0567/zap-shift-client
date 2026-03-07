import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='flex gap-3.5 m-2.5'>
            <h1 className='text-4xl text-red-400'>Payment Method has been Cancelled</h1>
            <Link to="/dashboard/my-parcels" className='btn btn-warning'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;