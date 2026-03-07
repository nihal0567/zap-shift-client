import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEye, FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async() => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })

const deleteRider= id =>{
    console.log(id);
    Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert rider!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/riders/${id}`)
                    .then(res=>{
                        console.log(res.data);
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "rider has been deleted.",
                                icon: "success"
                            });
                        }
                    }) .catch(err => console.log(err))
                } 
            });
}

    const updateRiderStatus =(rider, status) =>{
        const updatedStatus = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updatedStatus)
            .then(res => {
                refetch()
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been ${status}`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const handleApproval = rider => {
        updateRiderStatus(rider, 'approved')
    }

    const handleReject =rider =>{
        updateRiderStatus(rider, 'rejected')
    }

    return (
        <div>
            <h1 className='text-3xl m-2'>All Riders List {riders.length} </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1} </th>
                                <td>{rider.name}</td>
                                <td>{rider.email} </td>
                                <td>{rider.district}</td>
                                <td>
                                    <p className={`${rider.status=== 'approved' ?
                                    "text-green-600" : "text-red-500"
                                    }`}>{rider.status}</p>
                                </td>
                                <td>{rider.workStatus} </td>
                                <td>
                                    <button  className='btn'><FaEye /></button>
                                    <button onClick={() => handleApproval(rider)} className='btn'><FaUserCheck /></button>
                                    <button onClick={()=> handleReject(rider)} className='btn'><IoPersonRemove /></button>
                                    <button onClick={()=> deleteRider(rider._id)} className='btn'><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;