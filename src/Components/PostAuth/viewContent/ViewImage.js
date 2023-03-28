import './viewImage.css'

import useWindowResize from '../../../hooks/useWindowSize';


import React from 'react'

function ViewImage({viewContent, setViewContent}) {
const { width } = useWindowResize()
const back = <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40" fill='#FFFFFF'><path d="M480 896 160 576l320-320 47 46.666-240.001 240.001H800v66.666H286.999L527 849.334 480 896Z"/></svg>

  return (
    <div className='ViewImageMain'>
        <p style={{textAlign:'left',position:"absolute",top:"20px",left:'20px',cursor:'pointer'}} onClick={()=>setViewContent({type:'none',content:''})}>{back}</p>
        <p style={{width:'100%',height:'70%',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}><img src = {`https://savemyfile.onrender.com/image/getImage/${viewContent.content?.id?viewContent.content.id:viewContent.content._id}`} style={{height:'100%',maxWidth:'100%',objectFit:"contain"}}/></p>
    </div>
  )
}

export default ViewImage