import axios from "axios";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import getCountriesCities from "../../Hooks/Admin/getCountriesCities";

const Countries = () => {
    const [addCountry, setAddCountry] = useState(false);
    const [addCity, setAddCity] = useState(false);
    const [countriesCities, setCountriesCities] = useState([]);
    const [countryCity, setCountryCity] = useState({
        country: '',
        city: ''
    });
    const [currentPage, setCurrentPage] = useState(0);

    getCountriesCities().then(data => setCountriesCities(data));

    const onChange = (e) => {
        console.log("onCountryChange: ", e.target.name, ": ", e.target.value);

        setCountryCity({ ...countryCity, [e.target.name]: e.target.value });
        console.log("After typing the country and the city: ", countryCity);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            console.log(countryCity);

            const res = await axios.post('http://localhost:5000/admin/AddCountryCity', countryCity,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
            setAddCountry(false);

        } catch (error) {
            console.log(error);
        }
    }

    const pageCount = Math.ceil(countriesCities.length / 5);
    const handlePageClick = ({ selected }) => setCurrentPage(selected);
    const paginatedData = countriesCities.slice(currentPage * 5, (currentPage + 1) * 5);

    return (
        <>
            <div className="h-screen flex flex-col w-11/12 mx-auto">
                <h1 className="text-2xl mx-1 my-5">Countries</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-1 text-white bg-blue-600 rounded-sm cursor-pointer" onClick={() => setAddCountry(true)}>Add Country & City</button>
                    <button className="px-4 py-1 text-white bg-sky-600 rounded-sm cursor-pointer" onClick={() => setAddCity(true)} > Add City</button>
                </div>
                <div>
                    {
                        paginatedData.map((data) => (
                            <ul key={uuidv4()} className="bg-neutral-300 rounded-md p-5 mx-3 hover:bg-neutral-400/40 duration-200 cursor-pointer">
                                <li>{data.country}</li>
                                <li>{data.city}</li>
                            </ul>
                        ))
                    }
                </div>
                {pageCount > 1 && (
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
                )}
            </div >
            {addCountry && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onSubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        {[
                            { label: 'Country', name: 'country', type: 'text' },
                            { label: 'City', name: 'city', type: 'text' },
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
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm cursoir-pointer"
                                onClick={() => setAddCountry(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm cursor-pointer" >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {addCity && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onSubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        <div key={name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500">Country</label>
                            <select name="country" id="" onChange={onChange} className="border-0 mt-1 px-4 py-2 border rounded-sm bg-neutral-200 cursor-pointer" required>
                                <option value="">Select Country</option>
                                {
                                    countriesCities.map((countryCity) => {
                                        return <option key={uuidv4} value={countryCity.country}>{countryCity.country}</option>
                                    })
                                }
                            </select>
                            <label className="text-sm font-medium mt-4 text-gray-500">City</label>
                            <input
                                type="text"
                                name="city"
                                onChange={onChange}
                                placeholder="Enter City"
                                required
                                className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm cursor-pointer"
                                onClick={() => setAddCity(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm cursor-pointer">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </>
    )
}

export default Countries;