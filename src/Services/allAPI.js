import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI"; 

// register
export const registerAPI=async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

// login
export const loginAPI=async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// addProject

export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

// homeproject
export const homeprojectAPI=async()=>{
    return await commonAPI("Get",`${BASE_URL}/projects/home-project`,"","")
}

// allproject
export const allprojectsAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)
}

// userproject
export const userprojectsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-project`,"",reqHeader)
}

// edit Project
export const editProjectAPI=async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

// delete project
export const deleteProjectApi=async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}

// edit user
export const editUserApi=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}