import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const location = useLocation();
    const user = location.state;
    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        country: user?.country || '',
        city: user?.city || '',
        gender: user?.gender || '',
        age: user?.age || '',
        company: user?.company || ''
    });
    const { name, country, city, gender, age, company } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("id from onsubmit axios request: ", user.id);
            const res = await axios.post('http://localhost:5000/admin/EditUser', {
                ...formData,
                id: user.id
            });
            setEdit(false);
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            const res = axios.post("http://localhost:5000/admin/DeleteUser", { id: user.id });
            console.log(res);
            navigate("/admin/dashboard")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
                <button className="absolute top-5 right-29 bg-blue-400 text-white rounded-sm px-4 py-1 z-50"
                    onClick={() => setEdit(true)}>Edit</button>
                <button className="absolute top-5 right-7 bg-red-400 text-white rounded-sm px-4 py-1 z-50" onClick={onDelete}>Delete</button>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        User Profile
                    </h3>
                </div>
                <div className="relative border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.email}
                            </dd>
                        </div>

                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Age
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.age}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Gender
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.gender}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Country
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.country}
                            </dd>
                        </div>

                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                City
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.city}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Company
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {user.company && user.company}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {edit && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onSubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        {[
                            { label: 'Full name', name: 'name', type: 'text' },
                            { label: 'Country', name: 'country', type: 'text' },
                            { label: 'City', name: 'city', type: 'text' },
                            { label: 'Age', name: 'age', type: 'number' },
                            { label: 'Company', name: 'company', type: 'text' }
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={onChange}
                                    className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                />
                            </div>
                        ))}

                        {/* Email (Read-only) */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="mt-1 px-4 py-2 border rounded-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        {/* Gender Radio Buttons */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500">Gender</label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === 'Male'}
                                        onChange={onChange}
                                    /> Male
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === 'Female'}
                                        onChange={onChange}
                                    /> Female
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>

    )
}

export default UserDetails;