import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'

import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './Contexts/TokenAuth';
function App() {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthorisationContext)
  return (
    <div >
      <Routes>
         <Route path='/'  element={<Home/>}/>
         <Route path='/dashboard'  element={isAuthorized?<Dashboard />:<Home/>}/>
         <Route path='/login'  element={<Auth />}/>
         <Route path='/project'  element={isAuthorized?<Projects/>:<Home/>}/>
         <Route path='/register'  element={<Auth register/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
