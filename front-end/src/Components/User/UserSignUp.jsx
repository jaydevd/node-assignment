const UserSignUp = () => {
    return (
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold py-4">User Sign Up</h1>
                <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                    <form action="" className="w-full p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="ps-1">Name</label>
                            <input type="text" name="name" id="name" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="ps-1">Email address</label>
                            <input type="text" name="email" id="email" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Age</label>
                            <input type="number" name="age" id="age" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="gender" className="ps-1">Gender</label>
                            <div className="flex gap-3 ps-2">
                                <input type="radio" name="gender" className="px-4 py-2 text-md bg-neutral-100 rounded-md" /> Male
                                <input type="radio" name="gender" className="px-4 py-2 text-md bg-neutral-100 rounded-md" /> Female
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Age</label>
                            <input type="number" name="age" id="name" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="ps-1">Password</label>
                            <input type="password" name="password" id="password" className="px-4 py-2 text-md bg-neutral-100 rounded-md" />
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-400 text-white rounded-md py-2 w-full cursor-pointer">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UserSignUp;