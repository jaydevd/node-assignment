import Navbar from "../Navbar";

const AdminDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen w-full flex justify-center items-center">
                <div className="w-2/12 bg-grey-900 h-screen">
                    <div className="w-8/12 flex flex-col gap-3 ml-10 m-10">
                        <a href="/admin/listUsers" className="text-sky-500 hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200">Users</a>
                        <a href="/admin/listUsers" className="text-sky-500 hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200">Countries and Cities</a>
                        <a href="/admin/categories" className="text-sky-500 hover:bg-blue-300/20 px-4 py-3 rounded-md duration-200">Categories and sub categories</a>
                    </div>
                </div>
                <div className="w-10/12 bg-neutral-300 h-screen"></div>
            </div>
        </>
    )
}

export default AdminDashboard;