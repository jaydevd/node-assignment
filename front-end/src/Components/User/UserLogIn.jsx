import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/user/login', formData);
            const token = res.data.data.token;
            const user = res.data.data.user;
            console.log("log in token: ", token);
            console.log("log in user: ", user);

            localStorage.setItem("token", token);
            navigate("/user/dashboard", { state: user });

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold py-4 text-center">User Log in Page</h1>
            <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                <form className="w-full p-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sky-600/70 ps-1">Email address</label>
                        <input type="email" name="email" id="email" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="email@domain.com" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sky-600/70 ps-1">Password</label>
                        <input type="password" name="password" id="password" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="password" required />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-400 text-white rounded-md py-2 w-full cursor-pointer">Log In</button>
                    </div>
                </form>
            </div>
            <p>Don't have account? <a href="/user/signup" className="text-blue-600 underline">Create account</a></p>
        </div>
    )
}

export default UserLogIn;