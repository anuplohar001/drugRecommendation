import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import System from './components/System';
import Navbar from './components/Navbar';
import DrugAvailability from './components/DrugAvailability';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from "./components/AuthContext";
import MyProfile from './components/Myprofile';

function App() {  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/system" element={<System />} />
            <Route path="/availability" element={<DrugAvailability />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<MyProfile />} />
          </Routes>
        </div>
        <div className='z-20'>hiii</div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
