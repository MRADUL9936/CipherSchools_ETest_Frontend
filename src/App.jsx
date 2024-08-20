import { BrowserRouter, Routes, Route,useLocation,Navigate } from 'react-router-dom';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import Header from './components/Header/Header'; // Import the Header component
import Tests from './components/Test/Test';
import Permissions from './components/Permissions/permissions';
import StartTest from './components/StartTest/startTest';
import Submit from './components/Test/submit';


function App() {
  const location = useLocation();
  
  // Conditionally render the Header if the path is not "/test"
  const showHeader = location.pathname === "/login" || location.pathname === "/register" ;  


  return (
    <>
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/tests/permissions" element={<Permissions/>} />
          <Route path="/test/:testId" element={<StartTest/>} />
          <Route path="/submit" element={<Submit/>} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}