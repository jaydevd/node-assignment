import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import getCountriesCities from './../../Hooks/User/getCountriesCities';

const UserSignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        country: 'India',
        city: 'Rajkot',
        company: null
    });

    const [countriesCities, setCountriesCities] = useState([]);
    const [citiesByCountry, setCitiesBycountry] = useState([]);

    getCountriesCities().then(data => setCountriesCities(data));
    // console.log("countries data from user sign up page: ", countriesCities);

    const { name, email, age, country, city, password, company } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData({ ...formData, country: selectedCountry });
        const cities = countriesCities.filter((data) => data.country === selectedCountry);
        setCitiesBycountry(cities);
        // console.log(cities);
        // console.log("cities by country: ", citiesByCountry);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/user/signup', formData);
            const result = await axios.post('http://localhost:5000/user/login', { email, password });
            const user = result.data.data.user;
            const token = result.data.data.token;
            localStorage.setItem("token", token);
            navigate("/user/dashboard", { state: user });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold py-4">User Sign Up</h1>
                <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                    <form onSubmit={onSubmit} className="w-full p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="ps-1">Name</label>
                            <input type="text" name="name" id="name" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="ps-1">Email address</label>
                            <input type="text" name="email" id="email" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" required />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="gender" className="ps-1">Gender</label>
                            <div className="flex gap-4 ps-2">
                                <input type="radio" name="gender" value="Male" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" /> Male
                                <input type="radio" name="gender" value="Female" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" /> Female
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Age</label>
                            <input type="number" name="age" id="age" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="country" className="ps-1">Country</label>

                            <select name="country" id="country" value={country} className="px-4 py-2 text-md bg-neutral-100 rounded-md" onChange={onCountryChange} required>
                                {
                                    countriesCities.map((data) => {
                                        return <option key={data.country} value={data.country}>{data.country}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="city" className="ps-1">City</label>
                            <select name="country" value={city} className="px-4 py-2 text-md bg-neutral-100 rounded-md" onChange={onChange} required>
                                {
                                    citiesByCountry &&
                                    citiesByCountry.map((data) => {
                                        return <option key={data.city} value={data.city}>{data.city}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Company (Optional)</label>
                            <input type="text" name="company" id="company" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Password</label>
                            <input type="password" name="password" id="password" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" required />
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

export default UserSignUp;