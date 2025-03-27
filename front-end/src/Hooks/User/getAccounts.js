import axios from 'axios';
import { useEffect, useState } from "react";

const getAccounts = async (id) => {
  const [accounts, setAccounts] = useState([]);
  try {

    useEffect(() => {
      const fetchAPI = async () => {
        try {

          // const token = localStorage.getItem("token");
          axios.get('http://localhost:5000/user/ListAccounts', {
            params: { id: id }
          })
            // axios.get('http://localhost:5000/user/getAccounts', { 'headers': { 'Authorization': `Bearer ${token}` } })
            .then(res => {
              setAccounts(res.data.data);
              return accounts;
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

    return accounts;

  } catch (error) {
    console.log(error.message);
  }
}

export default getAccounts;