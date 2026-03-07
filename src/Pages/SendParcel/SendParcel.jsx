import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, control, } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()

    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })


    const districtByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }

    const sendParcel = data => {
        console.log(data);
        const isDocument = data.parcelType === 'document'
        const parcelWeight = parseFloat(data.parcelWeight)
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ?
                    extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge
            }
        }
        console.log('cost', cost);
        data.cost = cost
        Swal.fire({
            title: "Are you sure?",
            text: `need to pay ${cost} Tk !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Pay Now!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                .then(res => {
                        console.log('after saving data in db', res.data);
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel created. Pay Now",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <h2 className='text-5xl pl-5 my-5 '>Send A Parcel</h2>
            <form onSubmit={handleSubmit(sendParcel)} className='px-5'>
                {/* document type */}
                <div className="">
                    <label className="label mr-5">
                        <input type="radio" value="document" {...register('parcelType')} className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" value="non-document" {...register('parcelType')} className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* Parcel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" className="input w-full" {...register('parcelName')} placeholder="parcel name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" className="input w-full" {...register('parcelWeight')} placeholder="parcel weight (kg)" />
                    </fieldset>
                </div>

                {/* two column  */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-2'>
                    {/* sender details */}
                    <div className="">
                        <fieldset className="fieldset">
                            <h4 className='text-xl text-black'>Sender Details</h4>
                            {/* sender name */}
                            <label className="label">Sender Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly className="input w-full" {...register('senderName')} placeholder="Sender Name" />
                            {/* sender email */}
                            <label className="label">Sender Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="input w-full" {...register('senderEmail')} placeholder="Sender Email" />
                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* sender district */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District </legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* sender address */}
                            <label className="label mt-4">Sender Address</label>
                            <input type="text" className="input w-full" {...register('senderAddress')} placeholder="Sender Address" />
                        </fieldset>
                    </div>

                    {/* receiver details */}
                    <div className="">
                        <fieldset className="fieldset">
                            <h4 className='text-xl text-black'>Receiver Details</h4>
                            {/* Receiver name */}
                            <label className="label">Receiver Name</label>
                            <input type="text" className="input w-full" {...register('receiverName')} placeholder="Receiver Name" />
                            {/* Receiver email */}
                            <label className="label">Receiver Email</label>
                            <input type="email" className="input w-full" {...register('receiverEmail')} placeholder="Receiver Email" />

                            {/* receiver region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>
                            {/* receiver district */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* receiver address */}
                            <label className="label mt-4">Receiver Address</label>
                            <input type="text" className="input w-full" {...register('receiverAddress')} placeholder="Receiver Address" />

                        </fieldset>
                    </div>
                </div>
                <input type="submit" value="send parcel" className='btn btn-success my-5' />
            </form>
        </div>
    );
};

export default SendParcel;