import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()    
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://drugbackend.onrender.com/loginuser", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            if (response.ok) {
                login(email)
                navigate('/system')
            }
        } catch (error) {
            alert("Something Went Wrong !!!")
            console.error(error)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-black w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-black w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300"
                    >
                        Login
                    </button>
                </form>                

                {/* Links */}
                <div className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default Login;
