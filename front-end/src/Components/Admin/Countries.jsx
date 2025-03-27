import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import getCountries from "../../Hooks/Admin/getCountries";

const Countries = () => {
    const [addCountry, setAddCountry] = useState(false);
    const [addCity, setAddCity] = useState(false);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);

    const [city, setCity] = useState({
        country: '',
        city: ''
    });

    getCountries().then(data => setCountries(data));
    // console.log(countries);
    // setCountries(data);
    // getCountries.then(data => setCountries(data));
    // console.log(countries);

    const onCountryChange = (e) => {
        setCountry(e.target.value)
    }

    const onCountrySubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post('http://localhost:5000/admin/AddCountry', { country: country });
            // const res = await axios.post('http://localhost:5000/admin/AddCountry', country,
            //  {
            //     'headers': {
            //         'authorization': `Bearer ${token}`
            //     }
            // });
            setAddCountry(false);

        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        setCity({ ...city, [e.target.name]: e.target.value });
    }

    const onCitySubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log(city)
            const res = await axios.post('http://localhost:5000/admin/AddCity', city)
            // const res = await axios.post('http://localhost:5000/admin/AddCity', city, {
            //     'headers': {
            //         'authorization': `Bearer ${token}`
            //     }
            // });
            setAddCity(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="h-screen flex flex-col w-11/12 mx-auto">
                <h1 className="text-2xl mx-1 my-5">Countries</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-1 text-white bg-blue-600 rounded-sm" onClick={() => setAddCountry(true)}>Add Country</button>
                    <button className="px-4 py-1 text-white bg-sky-600 rounded-sm" onClick={() => setAddCity(true)} > Add City</button>
                </div>
                <div>
                    {
                        countries.map((data) => (
                            <ul key={uuidv4()} className="bg-neutral-300 rounded-md p-5 mx-3 hover:bg-neutral-400/40 duration-200 cursor-pointer">
                                <li>{data.country}</li>
                                <li>{data.city}</li>
                            </ul>
                        ))
                    }
                </div>
            </div >
            {addCountry && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onCountrySubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        {[
                            { label: 'Country', name: 'country', type: 'text' },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    onChange={onCountryChange}
                                    className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                />
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                onClick={() => setAddCountry(false)}
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
            {addCity && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onCitySubmit}
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
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                onClick={() => setAddCity(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm">
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