import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import getCategories from './../../Hooks/Admin/getCategories';

const Categories = () => {
    const [addCategory, setAddCategory] = useState(false);
    const [addSubCategory, setAddSubCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [subCategory, setSubCategory] = useState({
        category: '',
        subCategory: ''
    });

    getCategories().then(data => setCategories(data));
    // console.log(categories);

    const onCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const onCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log(category);
            // const res = await axios.post('http://localhost:5000/admin/AddCategory', { category: category });
            const res = await axios.post('http://localhost:5000/admin/AddCategory', category,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                });
            setAddCategory(false);

        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
    }

    const onSubCategorySubmit = async (e) => {
        e.preventDefault();

        try {
            // const res = await axios.post('http://localhost:5000/admin/addSubCategory', subCategory)
            const res = await axios.post('http://localhost:5000/admin/addSubCategory', subCategory, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setAddSubCategory(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="h-screen flex flex-col w-11/12 mx-auto">
                <h1 className="text-2xl mx-1 my-5">categories</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-1 text-white bg-blue-600 rounded-sm" onClick={() => setAddCategory(true)}>Add category</button>
                    <button className="px-4 py-1 text-white bg-sky-600 rounded-sm" onClick={() => setAddSubCategory(true)} > Add subCategory</button>
                </div>
                <div>
                    {
                        categories.map((data) => (
                            <ul key={uuidv4()} className="bg-neutral-300 rounded-md p-5 mx-3 hover:bg-neutral-400/40 duration-200 cursor-pointer">
                                <li>{data.category}</li>
                                <li>{data.subCategory}</li>
                            </ul>
                        ))
                    }
                </div>
            </div >
            {addCategory && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onCategorySubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        {[
                            { label: 'category', name: 'category', type: 'text' },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    onChange={onCategoryChange}
                                    className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                />
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                onClick={() => setAddCategory(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm" >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {addSubCategory && (
                <div className="fixed inset-0 bg-neutral-500/40 flex items-center justify-center">
                    <form
                        onSubmit={onSubCategorySubmit}
                        className="bg-white p-6 rounded-md shadow-md w-1/3 flex flex-col gap-4"
                    >
                        {[
                            { label: 'category', name: 'category', type: 'text' },
                            { label: 'subCategory', name: 'subCategory', type: 'text' },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    onChange={onChange}
                                    className="mt-1 px-4 py-2 border rounded-sm bg-neutral-200"
                                />
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="border border-blue-400 text-blue-400 px-4 py-2 rounded-sm"
                                onClick={() => setAddSubCategory(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded-sm">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default Categories;