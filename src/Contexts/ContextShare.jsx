import React, { createContext,useState } from 'react'
export const AddProjectResponseContext = createContext()

function ContextShare({children}) {
    const [AddProjectResponse,setAddProjectResponse] = useState([])
  return (
    <>
    <AddProjectResponseContext.Provider value={{AddProjectResponse,setAddProjectResponse}}>
        {children}
    </AddProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare