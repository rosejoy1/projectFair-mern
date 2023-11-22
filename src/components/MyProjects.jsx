import React, { useEffect, useState } from 'react'
import AddProject from './AddProject'
import { userprojectsAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyProjects() {
    const [userProject,setUserProject]=useState([])

    const getUserProjects=async()=>{
        if(sessionStorage.getItem("token")){
            const token=sessionStorage.getItem("token")
            const reqHeader={
                "Content-Type":"application/json", 
                "Authorization":`Bearer ${token}`
            }
            const result=await userprojectsAPI(reqHeader)
            if(result.status==200){
                setUserProject(result.data)
            }else{
                console.log(result);

            }
        }
    }

    useEffect(()=>{
        getUserProjects()
    },[])
  return (

    <div className='card shadow mt-3 p-3'>
        <div className='d-flex'>
            <h2>My Projects</h2>
            <div className='ms-auto'><AddProject/></div>
        </div>
        <div className='mt-4'>
            {/* collection of user projects */}
           { userProject?.length>0?userProject.map(project=>(
            <div className='d-flex align-items-center border rounded p-2'>
            <h3 className='text-success'>{project.title}</h3>
            <div className='ms-auto'>
                <button className='btn'> <i class="fa-solid fa-pen-to-square fa-2x"></i></button>
                <a href={`${project.github}`} target='_blank' className='btn'> <i class="fa-brands fa-github fa-2x"></i></a>
                <button className='btn'> <i class="fa-solid fa-trash fa-2x"></i></button>

            </div>


        </div>
           )):
            <p className='text-danger fw-bolder fs-4'>No Project Uploaded yet!!</p>
            }
        </div>


        < ToastContainer position='top-right' theme='colored'/>

    </div>
  )
}

export default MyProjects