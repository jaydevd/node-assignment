import axios from 'axios';
import { useEffect, useState } from "react";
const getUsers = async () => {
    try {
        const [users, setUsers] = useState([]);
        useEffect(() => {
            const fetchAPI = async () => {
                try {
                    
                    const res = await axios.get('http://localhost:5000/admin/ListUsers?page=1', { 'headers': { 'Authorization': `Bearer ${token}` } });
                    console.log(res);
                    setUsers(res);
                    return users.json();
                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, []);
    } catch (error) {
        console.log(error.message);
    }
}

export default getUsers;