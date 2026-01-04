import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {registerUser, } = useAuth()

    const handleRegister=(data)=>{
        console.log(data);
        registerUser(data.email, data.password)
        .then(result=>{
            console.log(result.user);
        }) .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Photo</label>
                            <input type="file" className="file-input" {...register('photo', {required: true})} />
                            {
                                errors.photo?.type === "required" && <p className='text-red-400'>photo empty</p>
                            }
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" className="input" {...register('name', {required: true})} placeholder="Your Name" />
                            {
                                errors.name?.type === "required" && <p className='text-red-400'>name empty</p>
                            }
                            {/* Email */}
                            <label className="label">Email</label>
                            <input type="email" className="input" {...register('email', {required: true})} placeholder="Email" />
                            {
                                errors.email?.type === "required" && <p className='text-red-400'>email empty</p>
                            }
                            <label className="label">Password</label>
                            <input type="password" className="input" {...register('password', {required: true})} placeholder="Password" />
                            {
                                errors.password?.type === 'required' && <p className='text-red-400'>password empty</p>
                            }
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <div><Link to="/login" className="link link-hover text-red-400">have an account</Link></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;