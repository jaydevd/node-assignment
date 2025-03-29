import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import getAccounts from "./../../Hooks/User/getAccounts";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [addAccount, setAddAccount] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [account, setAccount] = useState({
        name: '',
        category: '',
        subCategory: ''
    });

    const [data, setData] = useState({
        name: '',
        gender: '',
        age: '',
        company: '',
        country: '',
        city: ''
    })

    const location = useLocation();
    const user = location.state;
    // console.log(user);

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        }
    }, []);

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const onProfileChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        const res = await axios.post("http://localhost:5000/user/CreateAccount", { ...account, id: user.id });
        setAddAccount(false);
    }

    const onEditProfileSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/user/EditProfile", { ...data, id: user.id });
    }

    getAccounts(user.id).then((data) => setAccounts(data));

    const handleLogOut = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post('http://localhost:5000/admin/logout', token, {
                'headers': {
                    'authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            navigate("/user/login");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar title="Dashboard" />
            <div className="h-screen w-full flex justify-center">
                <div className="h-[85vh] relative w-2/12 bg-gray-700">
                    {/* <ul className="w-8/12 flex flex-col gap-3 ml-10 m-10">
                        <li className={`${showHome ? "text-sky-400" : "text-white"} hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200 cursor-pointer`}
                            onClick={handleViews}>Home</li>
                        <li className={`${showAccounts ? "text-sky-400" : "text-white"} hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200 cursor-pointer`}
                            onClick={handleViews}>Accounts</li>
                    </ul> */}
                    <button className="w-8/12 ml-10 m-10 absolute bottom-10 text-amber-700 hover:bg-red-400/30 cursor-pointer px-4 py-2 rounded-md" onClick={handleLogOut}>Log Out </button>
                </div>
                <div className="w-10/12 bg-neutral-200 h-screen">
                    <div className="h-screen w-11/12 bg-neutral-200 flex flex-col items-center mx-auto">
                        <h2 className='w-full my-4 text-2xl text-neutral-700 font-medium'>Profile</h2>
                        <div className="w-full flex justify-between gap-5 bg-neutral-300 rounded-md p-10">
                            <div className="w-1/2 flex flex-col gap-5">
                                <div className="flex flex-col ">
                                    <span className='text-teal-700 font-medium'>Name</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Gender</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.gender}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Age</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.age}</span>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col gap-5">
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Country</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.country}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>City</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.city}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Company</span>
                                    {/* <span className='font-bold'>name name</span> */}
                                    <span className='font-bold'>{user.company}</span>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => setEditProfile(true)} className="w-32 border border-blue-400 text-blue-400 rounded-md">Edit Profile</button>
                            </div>
                        </div>
                        <div className="w-full relative mt-10 mb-5 flex justify-between">
                            <h2 className='w-full px-1 text-2xl text-neutral-700 font-medium'>Accounts</h2>
                            <button className="absolute top-0 right-5 bg-blue-400 rounded-sm px-4 py-1 cursor-pointer" onClick={() => setAddAccount(!addAccount)}>Create Account</button>
                        </div>
                        <div className='relative w-full flex flex-col gap-5 bg-neutral-300 rounded-md p-10'>
                            {
                                accounts.map((account) => {
                                    <ul>
                                        <li>{account.name}</li>
                                        <li>{account.category}</li>
                                        <li>{account.subCategory}</li>
                                    </ul>
                                })
                            }
                        </div>
                    </div>
                    {addAccount && (
                        <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                            <form
                                onSubmit={onSubmit}
                                className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                            >
                                {[
                                    { label: 'Name', name: 'name', type: 'text' },
                                    { label: 'Category', name: 'category', type: 'text' },
                                    { label: 'Sub Category', name: 'subCategory', type: 'text' },
                                ].map(({ label, name, type }) => (
                                    <div key={name} className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-500">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            onChange={onChange}
                                            className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                        />
                                    </div>
                                ))}

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm" >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {editProfile && (
                        <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                            <form
                                onSubmit={onEditProfileSubmit}
                                className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                            >

                                {[
                                    { label: 'Full name', name: 'name', type: 'text' },
                                    { label: 'Country', name: 'country', type: 'text' },
                                    { label: 'City', name: 'city', type: 'text' },
                                    { label: 'Age', name: 'age', type: 'number' },
                                    { label: 'Company', name: 'company', type: 'text' }
                                ].map(({ label, name, type }) => (
                                    <div key={name} className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-500">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={data[name]}
                                            onChange={onProfileChange}
                                            className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                        />
                                    </div>
                                ))}

                                {/* Email (Read-only) */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-500">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        readOnly
                                        className="mt-1 px-4 py-2 border rounded-sm bg-gray-200 cursor-not-allowed"
                                    />
                                </div>

                                {/* Gender Radio Buttons */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-500">Gender</label>
                                    <div className="flex gap-4">
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={data.gender === 'Male'}
                                                onChange={onChange}
                                            /> Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={data.gender === 'Female'}
                                                onChange={onChange}
                                            /> Female
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                        onClick={() => setEditProfile(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserDashboard;