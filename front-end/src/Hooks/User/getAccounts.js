import axios from 'axios';
import { useEffect, useState } from "react";

const getAccounts = async (id) => {
  const [accounts, setAccounts] = useState([]);
  const [idState, setIdState] = useState(id);
  try {

    useEffect(() => {
      const fetchAPI = async () => {
        try {

          const token = localStorage.getItem("token");

          const res = await axios.get('http://localhost:5000/user/ListAccounts', {
            params: { id: idState },
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setAccounts(res.data.data);
          console.log(accounts, "accounts from user hook getAccounts");

        } catch (error) {
          console.log(error);
        }
      }
      fetchAPI();
    }, []);

    return accounts;

  } catch (error) {
    console.log(error.message);
  }
}

export default getAccounts;