import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineEditNote } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { MdGridView } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcel = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })

    const handlePayment= async(parcel)=>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }
        const res =await axiosSecure.post('/payment-checkout-session', paymentInfo)
        console.log(res.data.url);
        window.location.assign(res.data.url) 
    }

    const deleteParcel = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                .then(res=>{
                    console.log(res.data);
                    if (res.data.deletedCount) {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    }
    return (
        <div>
            <h1 className='my-2'>All of the parcels here {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Tracking Id</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, ind) => <tr key={parcel._id}>
                                <th>{ind + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>$ {parcel.cost}</td>
                                <td>
                                    <Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link>
                                </td>
                                <td>
                                    {
                                        parcel.paymentStatus ?
                                        <span className='text-green-400'>paid</span> : 
                                        <button onClick={()=> handlePayment(parcel)} className='btn btn-primary btn-sm text-black'>pay</button>
                                        // <Link to={`/dashboard/payment/${parcel._id}`} className='btn btn-primary btn-sm text-black'>pay</Link>
                                    }
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary'>
                                        <MdGridView />
                                    </button>
                                    <button className='btn btn-square mx-2 hover:bg-primary'>
                                        <MdOutlineEditNote />
                                    </button>
                                    <button
                                        onClick={() => deleteParcel(parcel._id)}
                                        className='btn btn-square hover:bg-primary'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;