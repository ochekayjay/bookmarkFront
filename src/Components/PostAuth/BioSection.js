import React,{useContext,useEffect,useState,useRef} from 'react'
import {Statecontext} from '../ContextBookmark'
import useWindowResize from '../../hooks/useWindowSize'
function BioSection() {
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [biodata,setbiodata] = useState({imageLink:'',collectionName:''})
    const [showsave,setshowsave] = useState(false)
    const [rerender,setrerender] = useState(false)
    const [projectTitle,setprojectTitle] = useState({projectTitle:'',})
    const [menuMobile, setMenuMobile] = useContext(Statecontext).menuMobile
    const [biowidth,setbiowidth] = useState(0)
    const [imageObj,setimageObj] = useState({myFile:''})
    
    const { width } = useWindowResize()
    
    
  const closeicon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>

    const fileref = useRef();

    const editCoin = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z"/></svg>

    const updateImageObj = (event)=>{
       
      setimageObj({[event.target.name] : event.target.files[0]})
  }


  //set biowidth

  const scrollbio = ()=>{
    console.log(biowidth)
    setbiowidth(-200)
  }


    const uploadImage = async(event)=>{
      event.preventDefault()
      

      try{
        console.log('a')
        const formData = new FormData();
        formData.append('myFile', imageObj.myFile)
        
        console.log('b')
        const addCoinCredentials = await fetch('https://savemyfile.onrender.com/bio/imagePush', {
            method: 'POST',                    
            headers: {  
                    Authorization: `Bearer ${userPayload.token}`
                    },
            body: formData
  }); 
    console.log(addCoinCredentials)
    const addnewCoinObject = await addCoinCredentials.json();
    console.log(addnewCoinObject)
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
  console.log(projectTitle)
  setprojectTitle({projectTitle:event.target.value})
}





const setProTitle = async() =>{
    try{
      console.log(projectTitle)
      const userTitle = await fetch('https://savemyfile.onrender.com/bio/usernamePush', {
              method: 'POST',
              headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userPayload.token}`
                      },
                      body: JSON.stringify(projectTitle)
   })
   console.log(`a in ${userTitle}`)
   const userHolder = await userTitle.json()
   console.log(`b in ${userHolder.projectTitle}`)
      
      setbiodata({...biodata,...{collectionName:userHolder.projectTitle}})
    }

    catch(error){
      throw new Error(error)
    }

}





    const loadFunction = async ()=>{
      try{
          console.log(userPayload.token===null)
          const addCoinCredentials = await fetch('https://savemyfile.onrender.com/bio/bioUpdate', {
              method: 'GET',
              headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userPayload.token}`
                      },
              
   })
      console.log(addCoinCredentials)
      const bioHolder = await addCoinCredentials.json()
      console.log(bioHolder)
      setbiodata({imageLink:bioHolder.avatarName,collectionName:bioHolder.projectTitle})
      }

      catch(error){
        console.log('error')
      }
    }
    
    const urlHolder = 'https://savemyfile.onrender.com'
    useEffect( ()=>{loadFunction() },[userPayload.token,rerender,width])
  return (
    <div style={{backgroundColor:'#0d47a1',position:width>700?"relative":'absolute',transition:"width 1s ease2-in-out",display:width>700?'block':menuMobile?'block':'none',left:'0px',zIndex:"300",width:width>700?'25%':menuMobile?"65%":'0px',boxShadow: '0px 0px 50px #0b1f36',border:'0.5px solid #0d47a1',height:'100%'}}>
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
          <p>Folders</p>
          <p>All Images</p>
          <p>All Links</p>
          <p>All Texts</p>
      </div>
      
    </div>
  )
}

export default BioSection