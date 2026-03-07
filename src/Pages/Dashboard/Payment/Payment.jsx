import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading';

const Payment = () => {
    const {parcelId} = useParams()
    const axiosSecure = useAxiosSecure()
    const {isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })

    const handlePayment= async()=>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url 
    }

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div>
            <h1>Plz Pay ${parcel.cost}: {parcel.parcelName} </h1>
            <button onClick={handlePayment} className="btn btn-primary">pay now</button>
        </div>
    );
};

export default Payment;