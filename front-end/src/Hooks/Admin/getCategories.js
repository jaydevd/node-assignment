import axios from 'axios';
import { useEffect, useState } from "react";

const getCategories = async () => {
    const [categories, setCategories] = useState([]);
    try {

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    const token = localStorage.getItem("token");

                    const res = await axios.get('http://localhost:5000/admin/GetCategories', { headers: { 'Authorization': `Bearer ${token}` } })
                    setCategories(res.data.data);

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