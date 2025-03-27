import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";
import Categories from "./Categories";
import Countries from "./Countries";
import UserListView from "./UserListView";

const AdminDashboard = () => {
    const [showUsers, setShowUsers] = useState(false);
    const [showCountries, setShowCountries] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const navigate = useNavigate();

    const handleUsersView = () => {
        setShowUsers(!showUsers);
        setShowCountries(!showCountries);
    }

    const handleCountriesView = () => {
        setShowUsers(!showUsers);
        setShowCountries(!showCountries);
    }

    const handleCategoriesView = () => {
        setShowUsers(!showUsers);
        setShowCategories(!showCategories);
    }

    const handleLogOut = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.post('http://localhost:5000/admin/logout', token, {
                'headers': {
                    'authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem("token");
            navigate("/admin/login");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar title="Admin Dashboard" />
            <div className="h-screen w-full flex justify-center">
                <div className="h-[85vh] relative w-2/12 bg-gray-700">
                    <ul className="w-8/12 flex flex-col gap-3 ml-10 m-10">
                        <li className="text-sky-400 hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200 cursor-pointer"
                            onClick={handleUsersView}>Users List View</li>
                        <li className="text-white hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200 cursor-pointer"
                            onClick={handleCountriesView}>Countries / Cities</li>
                        <li className="text-white hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200 cursor-pointer"
                            onClick={handleCategoriesView}
                        >Categories / Sub categories</li>
                    </ul>
                    <button className="w-8/12 ml-10 m-10 absolute bottom-10 text-amber-700 hover:bg-red-400/30 cursor-pointer px-4 py-2 rounded-md" onClick={handleLogOut}>Log Out </button>
                </div>
                <div className="w-10/12 bg-neutral-200 h-screen">
                    {
                        showUsers &&
                        <UserListView />
                    }
                    {
                        showCategories &&
                        <Categories />
                    }
                    {
                        showCountries &&
                        <Countries />
                    }
                </div>
            </div >
        </>
    )
}

export default AdminDashboard;