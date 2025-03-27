import { useEffect } from "react";

const createAccount = async () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const res = await axios.post('http://localhost:5000/user/CreateAccount', account);

  }, []);
}

export default createAccount;