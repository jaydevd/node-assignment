import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate } from "react-router-dom";
import getAccounts from "../../Hooks/User/getAccounts";
import Navbar from "../Navbar";

import { v4 as uuidv4 } from 'uuid';

const UserDashboard = () => {
    const location = useLocation();
    const user = location.state;
    const navigate = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [addAccount, setAddAccount] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const [account, setAccount] = useState({
        name: '',
        category: '',
        subCategory: ''
    });

    const [editAccount, setEditAccount] = useState(false);
    const [updateAccount, setUpdateAccount] = useState({
        id: '',
        name: '',
        category: '',
        sub_category: ''
    });

    const [data, setData] = useState({
        name: user.name,
        gender: user.gender,
        age: user.age,
        company: user.company,
        country: user.country,
        city: user.city
    })

    getAccounts(user.id).then(data => setAccounts(data));
    // console.log("accounts from dashboard: ", accounts);

    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        getAccounts().then((data) => {
            setAccounts(data);
            setFilteredAccounts(data);
        });
    }, []);

    useEffect(() => {
        getAccounts().then((data) => {
            setAccounts(data);
        });
    }, []);

    useEffect(() => {
        let filtered = [...accounts];

        if (searchTerm) {
            filtered = filtered.filter((acc) =>
                acc.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter((acc) => acc.category === selectedCategory);
        }
        if (selectedSubCategory) {
            filtered = filtered.filter((acc) => acc.sub_category === selectedSubCategory);
        }

        setFilteredAccounts(filtered);
    }, [searchTerm, selectedCategory, selectedSubCategory, accounts]);

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const onSearchChange = (e) => setSearchTerm(e.target.value);
    const onCategoryChange = (e) => setSelectedCategory(e.target.value);
    const onSubCategoryChange = (e) => setSelectedSubCategory(e.target.value);
    const onProfileChange = (e) => { setData({ ...data, [e.target.name]: e.target.value }); }

    const onSubmit = async (e) => {

        try {
            e.preventDefault();
            console.log("data from onSubmit: ", account, user.id);
            const res = await axios.post("http://localhost:5000/user/CreateAccount", { ...account, id: user.id });
            setAddAccount(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onEditProfileSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");

            const res = await axios.post("http://localhost:5000/user/EditProfile", { ...data, id: user.id }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setEditProfile(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogOut = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const res = await axios.post('http://localhost:5000/user/logout', { token: token }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            navigate("/user/login");

        } catch (error) {
            console.log(error);
        }
    }

    const onUpdateAccount = async (id) => {
        try {
            // e.preventDefault();
            const token = localStorage.getItem("token");
            console.log(token);

            const res = await axios.post("http://localhost:5000/user/UpdateAccount", { ...updateAccount, id: id }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setEditAccount(false)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const editAccountFn = (acc) => {
        setUpdateAccount(acc);
        console.log(updateAccount.id);
        setEditAccount(true);
    }

    const onUpdateAccountChange = (e) => {
        setUpdateAccount({ ...updateAccount, [e.target.name]: e.target.value });
    }
    const uniqueCategories = [...new Set(accounts.map((acc) => acc.category))];
    const uniqueSubCategories = [...new Set(accounts.map((acc) => acc.sub_category))];

    const onDeleteAccount = (id) => {
        // e.preventDefault();
        const token = localStorage.getItem("token");
        const res = axios.post("http://localhost:5000/user/DeleteAccount", { id: id }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        setAccounts(accounts.filter((acc) => acc.id !== id));
        setEditAccount(false);
    }

    const pageCount = Math.ceil(filteredAccounts.length / 5);
    const handlePageClick = ({ selected }) => setCurrentPage(selected);
    const paginatedData = accounts.slice(currentPage * 5, (currentPage + 1) * 5);

    return (
        <>
            <Navbar title="Dashboard" />
            <div className="h-screen w-full flex justify-center">
                <div className="h-[85vh] relative w-2/12 bg-gray-700">
                    <button className="w-8/12 ml-10 m-10 absolute bottom-10 text-amber-700 hover:bg-red-400/30 cursor-pointer px-4 py-2 rounded-md" onClick={handleLogOut}>Log Out</button>
                </div>
                <div className="w-10/12 bg-neutral-200 min-h-screen">
                    <div className="h-screen w-11/12 bg-neutral-200 flex flex-col items-center mx-auto">
                        <h2 className='w-full my-4 text-2xl text-neutral-700 font-medium'>Profile</h2>
                        <div className="w-full flex justify-between gap-5 bg-neutral-300 rounded-md p-10">
                            <div className="w-1/2 flex flex-col gap-5">
                                <div className="flex flex-col ">
                                    <span className='text-teal-700 font-medium'>Name</span>
                                    <span className='font-bold'>{user.name}</span>
                                </div>
                                <div className="flex flex-col ">
                                    <span className='text-teal-700 font-medium'>Email Address</span>
                                    <span className='font-bold'>{user.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Gender</span>
                                    <span className='font-bold'>{user.gender}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Age</span>
                                    <span className='font-bold'>{user.age}</span>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col gap-5">
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Country</span>
                                    <span className='font-bold'>{user.country}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>City</span>
                                    <span className='font-bold'>{user.city}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-teal-700 font-medium'>Company</span>
                                    <span className='font-bold'>{user.company}</span>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => setEditProfile(true)} className="w-32 border border-blue-400 text-blue-400 rounded-md">Edit Profile</button>
                            </div>
                        </div>
                        <div className="w-full relative mt-10 mb-5 flex justify-between">
                            <h2 className='w-full px-1 text-2xl text-neutral-700 font-medium'>Accounts</h2>
                        </div>
                        <div className="w-full flex justify-between items-center bg-white p-4 rounded-md shadow-md">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="w-1/3 p-2 border rounded-md"
                                value={searchTerm}
                                onChange={onSearchChange}
                            />
                            <select className="p-2 border rounded-md" value={selectedCategory} onChange={onCategoryChange}>
                                <option value="">All Categories</option>
                                {uniqueCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select className="p-2 border rounded-md" value={selectedSubCategory} onChange={onSubCategoryChange}>
                                <option value="">All Subcategories</option>
                                {uniqueSubCategories.map((subCat) => (
                                    <option key={subCat} value={subCat}>{subCat}</option>
                                ))}
                            </select>
                            <button
                                className="bg-blue-400 text-white px-4 py-2 rounded-md"
                                onClick={() => setAddAccount(true)}
                            >
                                Create Account
                            </button>
                        </div>
                        <div className='relative w-full flex flex-col gap-5 bg-neutral-300 rounded-md p-10'>
                            {
                                paginatedData.map((account) => {
                                    return <ul key={uuidv4()} className="relative">
                                        <li className="font-bold">{account.name}</li>
                                        <li className="text-neutral-500">Category: {account.category}</li>
                                        <li className="text-neutral-500">Sub Category: {account.sub_category}</li>
                                        <button className="absolute right-5 top-5 rounded-sm px-3 py-1 text-xs text-white bg-red-400/80 cursor-pointer" onClick={() => onDeleteAccount(account.id)}>Delete</button>
                                        <button className="absolute right-22 top-5 rounded-sm px-3 py-1 text-xs text-white bg-blue-400/80 cursor-pointer" onClick={() => editAccountFn(account)}>Edit</button>
                                    </ul>
                                })
                            }
                            {
                                accounts == [] &&
                                <ul>
                                    <li>No Accounts</li>
                                </ul>
                            }
                            {
                                pageCount > 1 && (
                                    <div className="flex justify-center my-4">
                                        <ReactPaginate
                                            previousLabel={"← Previous"}
                                            nextLabel={"Next →"}
                                            breakLabel={"..."}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            activeClassName={"active"}
                                        />
                                    </div>
                                )
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
                                        onClick={() => setAddAccount(false)}
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
                    {editAccount && (
                        <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onUpdateAccount(updateAccount.id)
                                }
                                }
                                className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                            >
                                {[
                                    { label: 'Name', name: 'name', type: 'text' },
                                    { label: 'Category', name: 'category', type: 'text' },
                                    { label: 'Sub Category', name: 'sub_category', type: 'text' },
                                ].map(({ label, name, type }) => (
                                    <div key={name} className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-500">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={updateAccount[name]}
                                            onChange={onUpdateAccountChange}
                                            className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                        />
                                    </div>
                                ))}

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                        onClick={() => setEditAccount(false)}
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
                </div>
            </div>
        </>
    )
}

export default UserDashboard;