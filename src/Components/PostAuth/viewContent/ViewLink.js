import './viewLink.css'

import useWindowResize from '../../../hooks/useWindowSize';


import React from 'react'

function ViewLink({viewContent, setViewContent}) {
const { width } = useWindowResize()
const back = <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40" fill='#FFFFFF'><path d="M480 896 160 576l320-320 47 46.666-240.001 240.001H800v66.666H286.999L527 849.334 480 896Z"/></svg>

  return (
    <div className='ViewLinkMain'>
        <p style={{textAlign:'left',position:"absolute",top:"20px",left:'20px',cursor:'pointer'}} onClick={()=>setViewContent({type:'none',content:''})}>{back}</p>
        <div style={{width:'100%',boxSizing:'border-box',display:'flex',fontSize:width>700?'20px':'15px',flexDirection:'column',justifyContent:'space-around',height:width>700?'70%':'55%',color:'white',overflow:"auto",backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',padding:'20px'}}>
            <div><p style={{display:'inline'}}>Title :</p>&nbsp;&nbsp;&nbsp;<p style={{display:'inline'}}>{viewContent.content?.title}</p></div>
            <div><p style={{display:'inline'}}>Link :</p>&nbsp;&nbsp;&nbsp;<p style={{display:'inline',color:'#6c9de6'}}><a  target="_blank" href={viewContent.content?.link} style={{textDecoration:'none',color:"white"}}>Visit Site</a></p></div>
            <div><p style={{display:'inline'}}>Description :</p>&nbsp;&nbsp;&nbsp;<p style={{display:'inline'}}>{viewContent.content?.description}</p></div>
            <div><p style={{display:'inline'}}>Source :</p>&nbsp;&nbsp;&nbsp;<p style={{display:'inline'}}>{viewContent.content?.source}</p></div>
        </div>
    </div>
  )
}

export default ViewLink