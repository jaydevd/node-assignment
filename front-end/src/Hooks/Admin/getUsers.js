import axios from 'axios';
import { useEffect, useState } from "react";

const getUsers = async () => {
    const [users, setUsers] = useState([]);
    try {

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    const token = localStorage.getItem("token");

                    axios.get('http://localhost:5000/admin/ListUsers?page=1', { 'headers': { 'Authorization': `Bearer ${token}` } })
                        .then(res => {
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

export default getUsers;