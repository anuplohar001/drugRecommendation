import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
const Signup = () => {
    const [userType, setUserType] = useState("Patient");
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signing up:", { userType, username, email, password });
       
        try {
            const response = await fetch("https://drugbackend.onrender.com/createuser",{
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({userType, username, email, password})
            })
            if(response.ok) {
                alert("User Created")
                navigate('/login')
            }
        } catch (error) {
            alert("Something Went Wrong !!!")
            console.error(error)
        }
    };

    return (
        <div className="text-black flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Type Selection */}
                    <div >
                        <label className="block text-gray-700 font-medium">I am a</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        >
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>

                    {/* username */}
                    <div>
                        <label className="block text-gray-700 font-medium">Full username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Enter your full username"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>



                {/* Links */}
                <div className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
