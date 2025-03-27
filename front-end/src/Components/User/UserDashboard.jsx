import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import getAccounts from "./../../Hooks/User/getAccounts";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [addAccount, setAddAccount] = useState({});
    const [account, setAccount] = useState({
        name: '',
        category: '',
        subCategory: ''
    });

    const location = useLocation();
    const user = location.state;
    // console.log(user);

    useEffect(() => {
        if (!user) {
            navigate("/user/login");
        }
    }, []);

    const onSubmit = async (e) => {

        e.preventDefault();
        const res = await axios.post("http://localhost:5000/user/CreateAccount", account);
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
                        </div>
                        <div className="w-full relative mt-10 mb-5 flex justify-between">
                            <h2 className='w-full px-1 text-2xl text-neutral-700 font-medium'>Accounts</h2>
                            <button className="absolute top-0 right-5 bg-blue-400 rounded-sm px-4 py-1 cursor-pointer" onClick={() => setAddAccount(true)}>Create Account</button>
                            {
                                addAccount && 
                                
                            }
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
                </div>
            </div >
        </>
    )
}

export default UserDashboard;