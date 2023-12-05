import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthorisationContext } from '../Contexts/TokenAuth';

function Header({insideDashboard}) {
   const navigate=useNavigate()
   const {isAuthorized,setIsAuthorized}=useContext(tokenAuthorisationContext)
   const handleLogout=()=>{
    // remove all existing user detaills from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    // navigate to landing page
    navigate('/')
   }
  return (
    <Navbar className="bg-info">
        <Container>
          <Navbar.Brand >

            <Link style={{textDecoration:"none",color:"white"}} to={'/'}>
            <div style={{ fontWeight: 'bold' }}>{' '}<i class="fa-brands fa-stack-overflow fa-bounce"></i>Project-Fair</div>
            </Link>
          
         
          </Navbar.Brand>
{insideDashboard&&
          <button onClick={handleLogout} className='btn btn-dark rounded-4'>
            Logout
          </button>}
        </Container>
      </Navbar>
  );
}

export default Header;