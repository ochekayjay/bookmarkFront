import React ,{useContext,useState,useEffect}from 'react'
import {Statecontext} from '../../ContextBookmark'


function Foldersection({folderContent, setfolderSelector}) {
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;


//function to open folder



 
 


const openFolder = (folder)=>{
    
    console.log(folder)
    setfolderId(folder._id);
    settriggerSection('section');
    setselectedFolder(folder)
    
}





  return (
    <div style={{width:'100%',height:'100vh',position:'relative',boxSizing:'border-box'}}>
        
        <div style={{height:'30%',padding:"15px",boxSizing:'border-box',width:"100%"}}>
        <div style={{margin:'18px 0px 0px 18px',height:"90%",width:"100%",fontFamily:'NexaTextBold',overflow:'auto',boxSizing:"border-box",fontSize:'45px',letterSpacing:'2px'}}>
            
            <p>Folder Section</p>
            <div style={{boxSizing:"border-box",fontSize:"30px",fontFamily:"NexaTextLight"}}>{folderContent.map(folder=><p>{folder.name}</p>)}</div>
            </div>
            
        </div>
        <div style={{position:'absolute',zIndex:"3",boxSizing:'border-box',bottom:'0px',left:'0px',width:'100%',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36'}}>
            <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p>FOLDERS</p><p onClick={()=>setfolderSelector(true)} className='smallbuttonToAddNewFolder'>+</p></div>
                <div style={{padding:'30px',height:'90%',overflow:'auto',boxSizing:"border-box"}}>
                    <div style={{color:'black',display:"grid",gridTemplateColumns:"auto auto",padding:"10px"}}>{folderContent.map(folder=><div onClick={()=>openFolder(folder)} style={{width:`calc(50%-20px)`,margin:"10px",boxSizing:"border-box",height:'250px',borderRadius:'10px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'grey',cursor:"pointer",color:'white',letterSpacing:'1.5px'}}>
                        <p>{folder.name}</p>
                        
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Foldersection