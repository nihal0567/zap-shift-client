import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {
    const { register, handleSubmit, control, } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const districtByRegion = region => {
        const regionDistricts = serviceCenters.filter(c => c.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }
    const riderRegion = useWatch({ control, name: 'region' })

    const handleRider = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Riders application has been submitted. please wait until selected as a rider",
                        showConfirmButton: false,
                        timer: 2500
                   });
                }
            })
    }
    return (
        <div>
            <h2 className='text-4xl text-primary'>Be a Rider</h2>
            <form onSubmit={handleSubmit(handleRider)} className='px-5'>


                {/* two column  */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-2'>
                    {/* sender details */}
                    <div className="">
                        <fieldset className="fieldset">
                            <h4 className='text-xl text-black'>Rider Details</h4>
                            {/* sender name */}
                            <label className="label">Rider Name</label>
                            <input type="text" defaultValue={user?.displayName} readOnly className="input w-full" {...register('name')} placeholder="Rider Name" />
                            {/* sender email */}
                            <label className="label">Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="input w-full" {...register('email')} placeholder="Email" />
                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Regions</legend>
                                <select {...register('region')} defaultValue="Pick a region" className="select">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* sender district */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District </legend>
                                <select {...register('district')} defaultValue="Pick a district" className="select">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* sender address */}
                            <label className="label mt-4">Your Address</label>
                            <input type="text" className="input w-full" {...register('address')} placeholder="Sender Address" />
                        </fieldset>
                    </div>

                    {/* receiver details */}
                    <div className="">
                        <fieldset className="fieldset">
                            <h4 className='text-xl text-black'>More Details</h4>
                            {/* Receiver name */}
                            <label className="label">Driving License</label>
                            <input type="text" className="input w-full" {...register('license')} placeholder="Driving License" />
                            {/* Receiver email */}
                            <label className="label">NID</label>
                            <input type="text" className="input w-full" {...register('nid')} placeholder="NID" />


                            {/* bike information */}
                            <label className="label mt-4">BIKE</label>
                            <input type="text" className="input w-full" {...register('bike')} placeholder="Bike" />

                        </fieldset>
                    </div>
                </div>
                <input type="submit" value="Apply as a Rider" className='btn btn-success my-5' />
            </form>
        </div>
    );
};

export default Rider;