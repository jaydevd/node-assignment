import axios from 'axios';
import { useEffect, useState } from "react";

const getSubCategories = async () => {
    try {
        const [users, setUsers] = useState([]);

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    const token = localStorage.getItem("token");
                    console.log("token from getUsers:", token);

                    axios.get('http://localhost:5000/admin/ListUsers?page=1', { 'headers': { 'Authorization': `Bearer ${token}` } })
                        .then(res => {
                            console.log("getUsers res (axios.then): ", res.data.data);
                            console.log(users);
                            setUsers(res.data.data);
                            return users;
                        })
                        .catch(err => {
                            console.log(err);
                        })
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

export default getSubCategories;