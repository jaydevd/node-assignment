import axios from 'axios';
import { useEffect, useState } from "react";

const getCountries = async () => {
    const [countries, setCountries] = useState([]);
    try {
        // console.log("get countries");

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    // const token = localStorage.getItem("token");

                    const res = await axios.get('http://localhost:5000/admin/GetCountries')
                    // axios.get('http://localhost:5000/admin/GetCountries', { 'headers': { 'Authorization': `Bearer ${token}` } })
                    setCountries(res.data.data);
                    // console.log(res);

                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, []);

        return countries;
    } catch (error) {
        console.log(error);
    }
}

export default getCountries;