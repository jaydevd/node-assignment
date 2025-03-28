import axios from 'axios';
import { useEffect, useState } from "react";

const getCountries = async () => {
    const [countries, setCountries] = useState();
    try {
        useEffect(() => {
            const fetchAPI = async () => {

                try {
                    const token = localStorage.getItem("token");
                    const res = await axios.get("http://localhost:5000/user/GetCountries", {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    });
                    setCountries(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, [])
        return countries;
    } catch (error) {
        console.log(error);
    }
}

export default getCountries;