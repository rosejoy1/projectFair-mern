import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectApi, userprojectsAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext, editProjectResponseContext } from '../Contexts/ContextShare';
import { Alert } from 'react-bootstrap';
import EditProject from './EditProject';


function MyProjects() {
    const [userProject,setUserProject]=useState([])
    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
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
    },[addProjectResponse,editProjectResponse])

    const handleDelete=async(id)=>{
        const token=sessionStorage.getItem("token")
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result=await deleteProjectApi(id,reqHeader)
        if(result.status==200){
            getUserProjects()
        }else{
            toast.error(result.response.data)
        }
    }
  return (

    <div className='card shadow mt-3 p-3'>
        <div className='d-flex'>
            <h2>My Projects</h2>
            <div className='ms-auto'><AddProject/></div>
        </div>
        {
            addProjectResponse.title? <Alert className='bg-success' dismissible><span className='bg-success'>{addProjectResponse.title}</span> added successfully!!!</Alert>:null
        }
        <div className='mt-4'>
            {/* collection of user projects */}
           { userProject?.length>0?userProject.map(project=>(
            <div className='d-flex align-items-center border rounded p-2'>
            <h5 className='text-success'>{project.title}</h5>
            <div className='ms-auto'>
               <EditProject project={project}/>
                <a href={`${project.github}`} target='_blank' className='btn'> <i class="fa-brands fa-github fa-2x"></i></a>
                <button onClick={()=>handleDelete(project._id)} className='btn'> <i class="fa-solid fa-trash fa-2x"></i></button>

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