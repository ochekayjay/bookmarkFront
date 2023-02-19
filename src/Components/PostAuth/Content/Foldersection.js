import React ,{useContext,useState,useEffect}from 'react'
import {Statecontext} from '../../ContextBookmark'

function Foldersection({folderContent}) {
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection


//function to open folder

const openFolder = (folder)=>{
    console.log(folder)
    setfolderId(folder._id);
    settriggerSection('section');
    setselectedFolder(folder)
}





  return (
    <div style={{width:'100%',height:'100%',position:'relative',boxSizing:'border-box'}}>
        
        <div style={{position:'absolute',top:'0px',left:'0px',height:'30%',boxSizing:'border-box'}}>
        
            <div style={{margin:'18px 0px 0px 18px',fontFamily:'NexaTextBold',fontSize:'45px',letterSpacing:'2px'}}>
            
            <p>Folder Section</p>
            </div>
        </div>
        <div style={{position:'absolute',boxSizing:'border-box',bottom:'0px',left:'0px',width:'100%',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36'}}>
            <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px'}}>FOLDERS</div>
                <div style={{padding:'30px',height:'90%',overflow:'auto',boxSizing:"border-box"}}>
                    <div style={{color:'black'}}>{folderContent.map(folder=><div onClick={()=>openFolder(folder)} style={{width:'140px',height:'250px',borderRadius:'10px',border:'1px solid white',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'grey',cursor:"pointer",color:'white',letterSpacing:'1.5px'}}>
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