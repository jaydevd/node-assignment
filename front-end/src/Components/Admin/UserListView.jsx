import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import getCountriesCities from '../../Hooks/Admin/getCountriesCities';
import getUsers from './../../Hooks/Admin/getUsers';

const UserListView = () => {
    const [users, setUsers] = useState([]);
    const [country, setCountry] = useState("All");
    const [search, setSearch] = useState("");
    const [countriesCities, setCountriesCities] = useState([]);
    const [citiesByCountries, setCitiesByCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    getUsers().then(data => setUsers(data));
    getCountriesCities().then(data => setCountriesCities(data));

    useEffect(() => {
        const fetchData = async () => {

            const res = await axios.get("http://localhost:5000/admin/SearchUsers", {
                params: { query: search }
            });
            // console.log(res);
            setUsers(res.data.data);
            console.log(users);
        }
        fetchData();
    }, [search]);

    const fetchSearchedUsers = async (query) => {
        try {
            const res = await axios.get("http://localhost:5000/admin/SearchUsers", {
                params: { query }
            });
            setFilteredUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const debouncedSearch = useCallback(debounce(fetchSearchedUsers, 500), []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredUsers(users); // Reset to all users when search is empty
        } else {
            debouncedSearch(search);
        }
    }, [search, users]);

    const onChange = (e) => {
        setCountry(e.target.value);
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const onCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        const cities = countriesCities.filter((data) => data.country === selectedCountry);
        setCitiesByCountries(cities);
    }

    useEffect(() => {
        if (country === "All") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user => user.country === country));
        }
    }, [country, users]);

    const pageCount = Math.ceil(filteredUsers.length / 5);
    const handlePageClick = ({ selected }) => setCurrentPage(selected);
    const paginatedData = filteredUsers.slice(currentPage * 5, (currentPage + 1) * 5);

    return (
        <>
            <div className="flex justify-center items-center flex-col my-2 gap-2">
                <form onSubmit={(e) => e.preventDefault()} className="relative hidden md:block w-96">
                    <input type="text" id="search-navbar" className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name or email" value={search} onChange={onSearchChange} />
                    <button className="hidden" type='submit'>Submit</button>
                </form>
                <select
                    name="filter-btn"
                    id="filter-btn"
                    className="w-fit h-fit border-none text-black bg-gray-300 rounded-md py-2 pl-2 cursor-pointer"
                    value={country}
                    onChange={onCountryChange}
                >
                    <option value="All">All Countries</option>
                    {countriesCities.map((data) => (
                        <option key={uuidv4()} value={data.country}>
                            {data.country}
                        </option>
                    ))}
                </select>
                <select
                    name="filter-btn"
                    id="filter-btn"
                    className="w-fit h-fit border-none text-black bg-gray-300 rounded-md py-2 pl-2 cursor-pointer"
                    onChange={onChange}
                >
                    <option value="All">All Cities</option>
                    {citiesByCountries.map((data) => (
                        <option key={uuidv4()} value={data.city}>
                            {data.city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="h-screen w-full mt-5 flex flex-col items-center">
                <div className="h-fit w-9/12 flex flex-col gap-1">
                    {paginatedData.map((user) => (
                        <ul key={uuidv4()} onClick={() => navigate(`/admin/DetailedView`, { state: user })} className="bg-neutral-300 rounded-md p-5 mx-3 hover:bg-neutral-400/40 duration-200 cursor-pointer">
                            <li>{user.name}</li>
                            <li>{user.email}</li>
                        </ul>
                    ))}
                </div>
                {pageCount > 1 && (
                    <div className="flex">
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
                )}
            </div >
        </>
    )
}

export default UserListView;