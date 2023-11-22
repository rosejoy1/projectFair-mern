import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Profile from '../components/Profile'
import MyProjects from '../components/MyProjects'
import { useState } from 'react'

function Dashboard() {
  const [username,setUsername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <div>
      <Header insideDashboard/>
      <Row style={{marginTop:"100px"}} className='container-fluid'>
        <Col  sm={12} md={8} >
          <h2>Welcome <span className='text-warning'>{username}</span></h2>
          {/* my projects */}
<MyProjects/>
        </Col>
        <Col className='d-flex justify-content-center ' sm={12} md={4}  >
      <Profile/>
        </Col>

      </Row>
    </div>
  )
}

export default Dashboard
