import { useState } from "react";
import getCities from "../../Hooks/Admin/getCities";
import Navbar from "../Navbar";
import getCategories from './../../Hooks/Admin/getCategories';
import getCountries from './../../Hooks/Admin/getCountries';
import getSubCategories from './../../Hooks/Admin/getSubCategories';
import getUsers from "./../../Hooks/Admin/getUsers";

import Categories from "./Categories";
import Countries from "./Countries";
import UserListView from "./UserListView";

const AdminDashboard = () => {
    const [showUsers, setShowUsers] = useState(true);
    const [showCountries, setShowCountries] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const handleViews = () => {
        setShowUsers(!showUsers);
        setShowCountries(!showCountries);
        setShowCategories(!showCategories);
    }

    return (
        <>
            <Navbar title="Admin Dashboard" />
            <div className="h-screen w-full flex justify-center items-center">
                <div className="w-2/12 bg-gray-900/70 h-screen">
                    <ul className="w-8/12 flex flex-col gap-3 ml-10 m-10">
                        <li className="text-sky-400 hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200" onClick={handleViews}>Users List View</li>
                        <li className="text-white hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200" onClick={handleViews}>Countries / Cities</li>
                        <li className="text-white hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200" onClick={handleViews}>Categories / Sub categories</li>
                    </ul>
                </div>
                <div className="w-10/12 bg-neutral-200 h-screen">
                    {
                        showUsers &&
                        <UserListView users={getUsers()} />
                    }
                    {
                        showCategories &&
                        <Categories categories={getCategories()} subCategories={getSubCategories()} />
                    }
                    {
                        showCountries &&
                        <Countries countries={getCountries()} cities={getCities()} />
                    }
                </div>
            </div >
        </>
    )
}

export default AdminDashboard;