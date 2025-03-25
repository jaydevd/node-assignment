import { useNavigate } from 'react-router';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar title="Assignment" />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-neutral-200 h-2/3 w-2/12 flex flex-col justify-center items-center gap-2 p-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-5">Log In</h1>
          <button className="w-10/12 bg-blue-400 rounded-md text-white px-4 py-2 cursor-pointer" onClick={() => navigate("/user/login")}>Log in as a User</button>
          <button className="w-10/12 border border-blue-400 rounded-md text-blue-400 px-4 py-1 cursor-pointer" onClick={() => navigate("/admin/login")}>Log in as an Admin</button>
        </div>
      </div >
    </>
  )
}

export default App;