import { Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PublicForm from './pages/PublicForm';
import Navbar from './components/Layout/Navbar';
 

function App() {
  return (
    <> 
    
    <AuthProvider>
       
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:formId" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form/:id" element={<PublicForm />} />
        </Routes>
      
    </AuthProvider></>
  );
}

export default App;