import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/admin/signup', formData);

            console.log('User Registered:', res);
            navigate("/admin/dashboard");
            alert('Sign up successful!');

        } catch (err) {
            console.log(err);
            console.error(err.response?.data?.message || 'Error signing up');
            alert(err.response?.data?.message || 'Error signing up');
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold py-4">Admin Sign Up</h1>
                <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                    <form onSubmit={onSubmit} className="w-full p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="ps-1">Name</label>
                            <input type="text" name="name" id="name" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="ps-1">Email address</label>
                            <input type="text" name="email" id="email" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="gender" className="ps-1">Gender</label>
                            <div className="flex gap-4 ps-2">
                                <input type="radio" name="gender" value="Male" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" default /> Male
                                <input type="radio" name="gender" value="Female" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" /> Female
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Password</label>
                            <input type="password" name="password" id="password" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-400 text-white rounded-md py-2 w-full cursor-pointer">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminSignUp;