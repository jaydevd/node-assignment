import axios from 'axios';
import { useEffect, useState } from "react";

const getCategories = async () => {
    const [categories, setCategories] = useState([]);
    try {

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    // const token = localStorage.getItem("token");

                    const res = await axios.get('http://localhost:5000/admin/GetCategories')
                    // axios.get('http://localhost:5000/admin/GetCountries', { 'headers': { 'Authorization': `Bearer ${token}` } })
                    setCategories(res.data.data);
                    // console.log(res);

                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, []);

        return categories;
    } catch (error) {
        console.log(error);
    }
}

export default getCategories;