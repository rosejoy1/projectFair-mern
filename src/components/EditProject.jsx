import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function EditProject({project}) {
    const [show, setShow] = useState(false);
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const [projectDetails,setProjectDetails]= useState({
        id:project._id, title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
    })
    const [preview,setPreview] = useState("")


    const handleClose = () =>{
        setShow(false)
    setProjectDetails({id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""})
    setPreview("")
    }
      const handleShow = () => setShow(true);
    
    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])

    const handleUpdate=async()=>{
        const{id,title,languages,github,website,overview,projectImage}=projectDetails
        if(!title||!languages || !github || !website ||!overview){
          toast.info("Please fill the form completely!!!")  
        }else{
            const reqBody=new FormData()
            reqBody.append("title",title)
            reqBody.append("languages",languages)
            reqBody.append("overview",overview)
            reqBody.append("github",github)
            reqBody.append("website",website)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
            const token=sessionStorage.getItem("token")
            if(preview){
                const reqHeader={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                // api call
                const result =await editProjectAPI(id,reqBody,reqHeader)
                if(result.status===200){
                    handleClose()
                    setEditProjectResponse(result.data)

                }else{
                    console.log(result);
                    toast.error(result.response.data)
                }
            }else{
                const reqHeader={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            // api call
                const result =await editProjectAPI(id,reqBody,reqHeader)
                if(result.status===200){
                    handleClose()
                    setEditProjectResponse(result.data)

                }else{
                    console.log(result);
                    toast.error(result.response.data)
                }
            }
        }
    }



  return (
    <>
         <button onClick={handleShow} className='btn'> <i class="fa-solid fa-pen-to-square fa-2x"></i></button>
         
         <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                           <label> <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} /><img className='img-fluid' src= {preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="" /></label>
                        </div>
                        <div className='col-lg-6'>
                            <div className='mb-3'><input className='form-control' type="text" placeholder='Project Title' value = {projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} /></div>

                            <div className='mb-3'><input className='form-control' type="text" placeholder='Language Used'value = {projectDetails.languages}  onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/></div>

                            <div className='mb-3'><input className='form-control' type="text" placeholder='Website Link'value = {projectDetails.website}  onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/></div>

                            <div className='mb-3'><input className='form-control' type="text" placeholder='Github Link'value = {projectDetails.github}  onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/></div>

                            <div className='mb-3'><input className='form-control' type="text" placeholder='Project Overview' value = {projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/></div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
            < ToastContainer position='top-right' theme='colored'/>

    </>
  )
}

export default EditProject