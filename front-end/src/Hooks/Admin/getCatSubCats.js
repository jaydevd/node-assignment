import axios from 'axios';
import { useEffect, useState } from "react";

const getCatSubCats = async () => {
    const [catSubCats, setCatSubCats] = useState([]);
    try {

        useEffect(() => {
            const fetchAPI = async () => {
                try {

                    const res = await axios.get('http://localhost:5000/user/GetCatSubCats');
                    setCatSubCats(res.data.data);

                } catch (error) {
                    console.log(error);
                }
            }
            fetchAPI();
        }, []);

        return catSubCats;
    } catch (error) {
        console.log(error);
    }
}

export default getCatSubCats;