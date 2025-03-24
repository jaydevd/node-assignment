const UserLogIn = () => {
    return (
        <>
            <div>
                <div className="h-screen w-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold py-4 text-center">Register Yourself</h1>
                    <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                        <form action="/user/signup" method="post" className="w-full p-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sky-600/70 ps-1">Name</label>
                                <input type="text" name="name" id="name" className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="eg. John Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sky-600/70 ps-1">Email address</label>
                                <input type="text" name="email" id="email" className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="email@domain.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="age" className="text-sky-600/70 ps-1">Age</label>
                                <input type="number" name="age" id="age" className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="Enter your age" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="gender" className="text-sky-600/70 ps-1">Gender</label>
                                <div className="flex gap-3 ps-3">
                                    <input type="radio" name="gender" className="px-4 py-2 text-md bg-neutral-200 rounded-md" checked /> Male
                                    <input type="radio" name="gender" className="px-4 py-2 text-md bg-neutral-200 rounded-md" /> Female
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="country" className="text-sky-600/70 ps-1">Country</label>
                                <select name="country" id="country" className="px-4 py-2 text-md bg-neutral-100 rounded-md">
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Russia">Russia</option>
                                    <option value="China">China</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="city" className="text-sky-600/70 ps-1">City</label>
                                <select name="city" id="city" className="px-4 py-2 text-md bg-neutral-100 rounded-md">
                                    <option value="">Gandhinagar</option>
                                    <option value="">Rajkot</option>
                                    <option value="">Ahmedabad</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="city" className="text-sky-600/70 ps-1">Company <i>(optional)</i></label>
                                <input type="text" name="city" id="city" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                            </div>
                            <div>
                                <button type="submit" className="bg-blue-400 text-white rounded-md py-2 w-full cursor-pointer">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserLogIn;