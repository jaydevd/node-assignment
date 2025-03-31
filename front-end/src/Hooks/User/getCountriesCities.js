import axios from 'axios';
import { useEffect, useState } from "react";

const getCountriesCities = async () => {
    const [countriesCities, setCountriesCities] = useState([]);
    try {
        useEffect(() => {
            const fetchAPI = async () => {

                try {
                    // const token = localStorage.getItem("token");
                    const res = await axios.get("http://localhost:5000/user/GetCountriesCities");
                    // console.log("countries data from user hook getCountries: ", res.data.data);
                    setCountriesCities(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, [])
        return countriesCities;
    } catch (error) {
        console.log(error);
    }
}

export default getCountriesCities;