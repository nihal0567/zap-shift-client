import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Login = () => {
    const {register, handleSubmit} = useForm()
    const {signInUser} = useAuth()
    const handleLogin=(data)=>{
        console.log('log', data);
        signInUser(data.email, data.password)
        .then(result=>{
            console.log(result.user);
        }) .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" {...register('email')} placeholder="Email" />
                            
                            <label className="label">Password</label>
                            <input type="password" className="input" {...register('password')} placeholder="Password" />
                            
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <div><Link to="/register" className="link link-hover text-red-400">have an account</Link></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;