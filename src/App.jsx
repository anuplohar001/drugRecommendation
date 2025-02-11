import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import System from './components/System.jsx';
import Navbar from './components/Navbar.jsx';
import DrugAvailability from './components/DrugAvailability.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from "./components/AuthContext.jsx";
import MyProfile from './components/MyProfile.jsx';

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
