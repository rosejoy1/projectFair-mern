import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'

import Footer from './components/Footer';
import Auth from './components/Auth';
function App() {
  return (
    <div >
      <Routes>
         <Route path='/'  element={<Home/>}/>
         <Route path='/dashboard'  element={<Dashboard />}/>
         <Route path='/login'  element={<Auth />}/>
         <Route path='/projects'  element={<Projects/>}/>
         <Route path='/register'  element={<Auth register/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
