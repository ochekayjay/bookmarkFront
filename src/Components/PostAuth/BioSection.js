import React,{useContext,useEffect,useState,useRef} from 'react'
import {Statecontext} from '../ContextBookmark'
import useWindowResize from '../../hooks/useWindowSize'
import './biosection.css'
import twitter from './bioImages/twitter.png'
import gmail from './bioImages/gmail.png'
import linkedin from './bioImages/linkedin.png'
import { ImageCallFunc, TextCallFunc, LinkCallFunc, folderCallFunc } from './FolderSetter'
function BioSection() {
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [biodata,setbiodata] = useState({imageLink:'',collectionName:''})
    const [showsave,setshowsave] = useState(false)
    const [rerender,setrerender] = useState(false)
    const [projectTitle,setprojectTitle] = useState({projectTitle:'',})
    const [menuMobile, setMenuMobile] = useContext(Statecontext).menuMobile
    const [biowidth,setbiowidth] = useState(0)
    const [imageObj,setimageObj] = useState({myFile:''})
    const [sectionShow,setSectionShow] = useContext(Statecontext).sectionShow
    const [folderContent,setfolderContent] = useContext(Statecontext).folderContent
    const [textArray, setTextArray] = useContext(Statecontext).textArray
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const [ImageArray, setImageArray] = useContext(Statecontext).ImageArray
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const [sectionLoad,setSectionLoad] = useContext(Statecontext).sectionLoad
    const [folderLoad,setfolderLoad] = useContext(Statecontext).folderLoad
    const [searchvalue,setsearchvalue] = useContext(Statecontext).searchvalue
    
    const { width } = useWindowResize()
    
    
  const closeicon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>

    const fileref = useRef();

    const editCoin = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>

    const updateImageObj = (event)=>{
       
      setimageObj({[event.target.name] : event.target.files[0]})
  }


  //set biowidth

  const scrollbio = ()=>{
    
    setbiowidth(-200)
  }


  //function to declare section

  const sectionDeclare = async(token,type)=>{
      if(type==='folder'){
        setsearchvalue('')
        setfolderLoad(true)
        settriggerSection('folder')
        setSectionShow(type)
        const folderData = await folderCallFunc(token)
        if(folderData?.state){
          setfolderLoad(false)
          setfolderContent({state:true,data:folderData.folderdata})
        }
        else{
          setfolderLoad(false)
          setfolderContent({state:false,data:[]})
        }
        
        
        
      }
      else if(type === 'text'){
          setsearchvalue('')
          setTextArray({state:false,data:[]})
          setSectionLoad({...sectionLoad,...{text:true}})
          settriggerSection('folder')
          setSectionShow(type)
          const textData = await TextCallFunc(token)
          
          if(textData.state){
            setTextArray({state:true,data:textData.textdata})
            setSectionLoad({...sectionLoad,...{text:false}})
          }
          else{
            setTextArray({state:false,data:[]})
            setSectionLoad({...sectionLoad,...{text:false}})
          }
          
      }
      else if(type === 'link'){
        setsearchvalue('')
        setLinkArray({state:false,data:[]})
        setSectionLoad({...sectionLoad,...{link:true}})
        settriggerSection('folder')
        setSectionShow(type)
        const linkData = await LinkCallFunc(token)
        if(linkData.state){
          setLinkArray({state:true,data:linkData.linkdata})
          
          setSectionLoad({...sectionLoad,...{link:false}})
        }
        else{

          setLinkArray({state:false,data:[]})
          
          setSectionLoad({...sectionLoad,...{link:false}})
        }
      }
      else{
        setsearchvalue('')
        setImageArray({state:false,data:[]})
        setSectionLoad({...sectionLoad,...{image:true}})
        settriggerSection('folder')
        setSectionShow(type)
        const imageData = await ImageCallFunc(token)
        if(imageData.state){
          setImageArray({state:true,data:imageData.imagedata})
        
        setSectionLoad({...sectionLoad,...{image:false}})
        }
        else{
          setImageArray({state:false,data:[]})
        
          setSectionLoad({...sectionLoad,...{image:false}})
        }
        
      }
  }

    const uploadImage = async(event)=>{
      event.preventDefault()
      

      try{
        
        const formData = new FormData();
        formData.append('myFile', imageObj.myFile)
        
        
        const addCoinCredentials = await fetch('https://savemyfile.onrender.com/bio/imagePush', {
            method: 'POST',                    
            headers: {  
                    Authorization: `Bearer ${userPayload.token}`
                    },
            body: formData
  }); 
    
    const addnewCoinObject = await addCoinCredentials.json();
    
    if(addnewCoinObject.success){
      setrerender(!rerender)
    }
      }
      catch(error){
        console.log('log-in errors.')
      }
}

const setTitle = (event)=>{
  //setbiodata({...biodata,...{collectionName:event.target.value}})
  
  setprojectTitle({projectTitle:event.target.value})
}





const setProTitle = async() =>{
    try{
      
      const userTitle = await fetch('https://savemyfile.onrender.com/bio/usernamePush', {
              method: 'POST',
              headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userPayload.token}`
                      },
                      body: JSON.stringify(projectTitle)
   })
  
   const userHolder = await userTitle.json()
   
      
      setbiodata({...biodata,...{collectionName:userHolder.projectTitle}})
    }

    catch(error){
      throw new Error(error)
    }

}





    const loadFunction = async ()=>{
      try{
          
          const addCoinCredentials = await fetch('https://savemyfile.onrender.com/bio/bioUpdate', {
              method: 'GET',
              headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userPayload.token}`
                      },
              
   })
    
      const bioHolder = await addCoinCredentials.json()
      setbiodata({imageLink:bioHolder.avatarName,collectionName:bioHolder.projectTitle})
      }

      catch(error){
        console.log('error')
      }
    }
    
    const urlHolder = 'https://savemyfile.onrender.com'
    useEffect( ()=>{loadFunction() },[userPayload.token,rerender,width])
  return (
    <div className= {width>700?'bioMainClass':menuMobile?'bioMainMobile':"bioMobileOff"} >
      <p onClick={()=>setMenuMobile(!menuMobile)} style={{padding:"10px",display:width>700?"none":'flex',justifyContent:"center",alignItems:"center",boxSizing:"border-box",position:'absolute',top:"10px",right:'10px',borderRadius:"50%",boxShadow: '0px 0px 50px #0b1f36'}}>{closeicon}</p>
      <p style={{margin:'15px',textAlign:'left',paddingLeft:"15px",fontFamily:'NexaTextBold',fontSize:'30px',color:'white'}}>buukmark</p>
      <div style={{width:'100%',boxSizing:'border-box',textAlign:'center'}}>
        <p onClick={(event)=>{uploadImage(event);setshowsave(false)}} style={{display:showsave?'block':'none',padding:"5px",backgroundColor:'#0d47a1',boxShadow: '0px 0px 50px #0b1f36',width:'35px',margin:'5px auto',textAlign:'center',color:'white',borderRadius:'7px'}}>Save</p>
        <div style={{width:'150px',height:'150px',borderRadius:'50%',margin:'5px auto',backgroundColor:'white',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        
          <input ref={fileref} type='file' id='myFile' name='myFile' onChange={(event)=>{updateImageObj(event)}} style={{height:'10px',width:'10px',display:'none'}}/>
          <label for='myFile' onClick={()=>setshowsave(true)}>
            <p style={{position:'absolute',top:'5px',right:'-3px',cursor:'pointer'}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z"/></svg>
            </p>
          </label>
        
          <img src={biodata.imageLink} style={{width:'80%',height:'80%',margin:'20% auto',borderRadius:'50%',objectFit:"cover"}}/>
        </div>
      </div>
      <div style={{borderRadius:'10px',border:'1.5px solid white',height:'50px',boxShadow: '0px 0px 15px #0b1f36',width:'250px',margin:'15px auto',display:'flex'}}>
          <input placeholder='Project title...' value = {biodata.collectionName} onChange ={(event)=>setTitle(event)} style={{boxSizing : 'border-box',height:'100%',paddingLeft:'7px',borderRadius:'10px',width:'70%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
          <span onClick={()=> setProTitle()} style={{border:'1.5px solid white',height:'100%',width:'30%',borderWidth:'0px 0px 0px 1.5px',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center'}}>{editCoin}</span>
      </div>

      <div style={{fontFamily:'NexaTextLight',marginTop:'65px',paddingLeft:'30px',color:'white',fontSize:'20px'}}>
          <p style={{marginTop:'30px',cursor:'pointer',padding:'10px',textAlign:'left',backgroundColor:sectionShow==="folder"?"#6c9de6":"#0d47a1",width:'60%',margin:'10px auto',borderRadius:'10px'}} onClick={()=>sectionDeclare(userPayload.token,'folder')}>Folders</p>
          <p style={{marginTop:'30px',cursor:'pointer',padding:'10px',textAlign:'left',backgroundColor:sectionShow==="image"?"#6c9de6":"#0d47a1",width:'60%',margin:'10px auto',borderRadius:'10px'}} onClick={()=>sectionDeclare(userPayload.token,'image')}>All Images</p>
          <p style={{marginTop:'30px',cursor:'pointer',padding:'10px',textAlign:'left',backgroundColor:sectionShow==="link"?"#6c9de6":"#0d47a1",width:'60%',margin:'10px auto',borderRadius:'10px'}} onClick={()=>sectionDeclare(userPayload.token,'link')}>All Links</p>
          <p style={{marginTop:'30px',cursor:'pointer',padding:'10px',textAlign:'left',backgroundColor:sectionShow==="text"?"#6c9de6":"#0d47a1",width:'60%',margin:'10px auto',borderRadius:'10px'}} onClick={()=>sectionDeclare(userPayload.token,'text')}>All Texts</p>
          <div style={{width:"100%",margin:'10px auto',marginTop:"25px",display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
            <p style={{fontSize:'15px',paddingLeft:'30px',marginBottom:"10px"}}>Contact Developer</p>
            <div style={{display:'flex',justifyContent:'space-around'}}><p><a style={{color:'white' ,textDecoration:"none"}} href='https://twitter.com/kjay_wonder?t=_fHZMNnjunlghRfsxZS-VA&s=09' target="_blank" ><img src={twitter}/></a></p>
                                          <p><a style={{color:'white' ,textDecoration:"none"}} href='https://www.linkedin.com/in/joseph-dickson-a66b9a1a2/' target="_blank" ><img src={linkedin}/></a></p>
                                          <p><a style={{color:'white' ,textDecoration:"none"}} href='https://mail.google.com/mail/u/1/#inbox?compose=CllgCJfscdngHVNXffhZZZtBkBXBlLVRkqpCBfMpXjDJkhcSDSKlfcNbNMtqWBMJljkWqPKpDHL' target="_blank" ><img src={gmail}/></a></p>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default BioSection