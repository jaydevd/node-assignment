import axios from 'axios';
import { useEffect, useState } from "react";

const getUsers = async () => {
    const [users, setUsers] = useState([]);
    try {

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    const token = localStorage.getItem("token");

                    const res = await axios.get('http://localhost:5000/admin/ListUsers?page=1', { headers: { 'Authorization': `Bearer ${token}` } });
                    setUsers(res.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, []);

        return users;

    } catch (error) {
        console.log(error.message);
    }
}

export default getUsers;