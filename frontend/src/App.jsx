import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the new Navbar
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import UserPublic from './pages/UserPublic';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {/* Dynamic route for Requirement #5 */}
        <Route path="/profile/:username" element={<UserPublic />} />
      </Routes>
    </Router>
  );
}

export default App;