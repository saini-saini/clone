import React from 'react'
import img from "../../images/404error.png"
const PageNotFound = () => {
  return (
    <div>
     <img style={{width:"100%", height:"90vh", objectFit:"contain"}} src={img} alt="404error" />
    </div>
  )
}

export default PageNotFound
