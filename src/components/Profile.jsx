import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserApi } from '../Services/allAPI';



function Profile() {
    const [open, setOpen] = useState(false);
    const [userProfile,setUserProfile]=useState({
      username:"",email:"",password:"",profile:"",github:"",linkedin:""
    })
    const [existingImage,setExistingImage]=useState("")
    const [preview,setPreview]=useState("")
    const [updated,setUpdated]=useState(false)

    useEffect(()=>{
      setUpdated(false)
      const user=JSON.parse(sessionStorage.getItem("existingUser"))
      if(sessionStorage.getItem("existingUser")){
        const user=JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})
        setExistingImage( `${BASE_URL}/uploads/${user.profile}`  )
      }
    },[open])

    useEffect(()=>{
      if(userProfile.profile){
        setPreview(URL.createObjectURL(userProfile.profile))
      }else{
        setPreview("")
      }
    },[userProfile.profile])
    
    const handleProfileUpdate=async()=>{
      const {username,email,password,profile,github,linkedin}=userProfile
      if(!github||!linkedin){
        toast.info("Please fill the form completely!!!")
      }else{
        const reqBody=new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
        const token=sessionStorage.getItem("token")
        if(preview){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`

          }
          const res=await editUserApi(reqBody,reqHeader)
          if(res.status===200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(res.data))
          } else{
            setOpen(!open)
            console.log(res);
            console.log(res.response.data);
          }
        }else{
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`

          }
          const res=await editUserApi(reqBody,reqHeader)
          if(res.status===200){
            setOpen(!open)
            sessionStorage.setItem("existingUser",JSON.stringify(res.data))
          } else{
            setOpen(!open)
            console.log(res);
            console.log(res.response.data);
          }
          
        }
      }
    }
  return (
    <div>

        <Card style={{width:"20rem"}} className='p-4 mb-4 pt-5 pb-5'>

            <div className='d-flex justify-content-between '>
                <h3>My Profile</h3>
                <button  aria-controls="example-collapse-text"
        aria-expanded={open}  onClick={() => setOpen(!open)} style={{height:"30px",fontSize:"14px"}} className='btn btn-primary '><i class="fa-solid fa-check"></i></button>
            </div>

            <Collapse in={open}>

             <div id="example-collapse-text">
                   <div className='d-flex justify-content-center'>
                    <label htmlFor="profile">
                        {/* upload picture */}
                        <input onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}  id='profile' type="file"  style={{display:"none"}}/>
                       {existingImage!==""?
                          <img style={{width:"150px",height:"150px"}} src={preview?preview: existingImage}alt="" />:
                          <img style={{width:"150px",height:"150px"}} src={preview?preview: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }alt="" />
                        }
        
        
                    </label>
                     
                     </div>
        
                   <div className='mt-4'>
                   <input 
                         value={userProfile.github} 
                         onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})}  className='form-control ' type="text" placeholder='Github link' />
                        <input  value={userProfile.linkedin}  onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} className='form-control mt-4' type="text" placeholder='LinkedIn link' />
                        <button  className='btn btn-warning w-100 mt-3' onClick={handleProfileUpdate}>Update</button>
        
        
                   </div>
             </div>
    
           </Collapse>
           

        </Card>

        < ToastContainer position='top-right' theme='colored'/>

    </div>
  )
}

export default Profile
