import React, {useContext} from 'react'
import { Statecontext } from '../ContextBookmark';
import useWindowResize from '../../hooks/useWindowSize';

function NoFolders({setfolderSelector}) {
  const [menuMobile, setMenuMobile] = useContext(Statecontext).menuMobile
    const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
    const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#0d47a1"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>
    const {width} = useWindowResize()

  return (
    <div style={{color:'black',width:'75%'}}>
      <div style={{display:width>700?'none':"block",paddingBottom:'10px',position:"absolute",top:'15px',backgroundColor:"white",zIndex:"4",left:"15px",width:"100%",boxSizing:"border-box"}}>
            <p onClick={()=>setMenuMobile(!menuMobile)} style={{height:"40px",width:"40px",display:width>700?"none":'flex',justifyContent:"center",alignItems:"center",boxSizing:"border-box",marginTop:"5px",marginLeft:'5px',borderRadius:"50%",boxShadow: '0px 0px 5px #0b1f36'}}>{menuIcon}</p>   
        </div>
          <div style={{width:width>700?"70%":'80%',margin:width>700?"30px auto":'250px auto'}}>
            <p style={{fontFamily:'NexaTextBold',fontSize:width>700?"70px":'25px',color:'black'}}>You have no folder yet on your project</p>
            <div className='addNewFolder'>
              <p className='buttonToAddNewFolder' onClick={()=>setfolderSelector(true)}>{newfoldericon}</p>
            </div>
          </div>
        </div>
  )
}

export default NoFolders