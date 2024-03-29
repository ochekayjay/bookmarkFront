import React,{useState,useEffect,useContext} from 'react'
import BioSection from './BioSection'
import './userPage.css'
import NoFolders from './NoFolders'
import { Statecontext } from '../ContextBookmark'
import FolderContent from './Content/FolderContent'
import Foldersection from './Content/Foldersection'
import Addfolder from './Content/Addfolder'

function UserPage() {
  const [folderSelector,setfolderSelector] = useState(false)
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const [folders,setfolders] = useContext(Statecontext).folders
  const [foldertitle,setfoldertitle] = useState({name:''});
  const [folderExists,setfolderExists] = useContext(Statecontext).folderExists
  const [folderContent,setfolderContent] = useContext(Statecontext).folderContent
  const [folderLoad,setfolderLoad] = useContext(Statecontext).folderLoad
  const [showError,setShowError] = useState(false)
  const [errObj,setErrObj] = useContext(Statecontext).errObj
  
  
  
  const [foldercalltrigger,setfoldercalltrigger] = useState(false)
  const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
  
//useEffect that resets token when page is refreshed

useEffect(()=>{
  const userDetail = JSON.parse(window.localStorage.getItem('Userdata'));
  /*console.log(userDetail)
  console.log(userDetail._id)
  console.log(userDetail.Username)
  console.log(userDetail.Email)
  const {_id, Username,Email,Token} = userDetail
  console.log(_id)
  setuserPayload({...userPayload,...{id:_id,userName:Username,email:Email,token:Token}})*/
  
  setuserPayload({id:userDetail._id,userName:userDetail.Username,email:userDetail.Email,token:userDetail.Token})

},[])


  const folderCallFunc = async()=>{
    console.log(userPayload.token)
    console.log(userPayload)
    try{
    const folderObj = await fetch('https://savemyfile.onrender.com/folder',{
      method:'GET',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`
              }
              })
      const folderdat = await folderObj.json()
      console.log(folderdat)
      if(!folderdat.state && userPayload.token===''){
        console.log('wrong')
          setfolderExists('none')
      }

      else if(!folderdat.state){
        console.log('wrong-wright')
          setfolderExists(false)
      }
      else{
        console.log('wright')
        setfolderExists(true)
        setfolderContent({state:true,data:folderdat.folderdata})
      }
        }
    catch(error){
          console.log(error)
            }
      }

  useEffect(()=>{ folderCallFunc()
      },[userPayload.token])

  //change function to create title of folder

  const changeFieldData = (event)=>{
      event.preventDefault()
      setfoldertitle({[event.target.name]:event.target.value})
  }


  










  
  //function to create folder
  const createFolder = async(event)=>{
    event.preventDefault()
    if(foldertitle.name===''){
  
      setShowError(true)
      setErrObj({status:'fill',message:'fill neccessary fields'})
    }
    else{

    try{
    const FolderObjectCreated = await fetch('https://savemyfile.onrender.com/folder',{
      method:'POST',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`
              },
              body: JSON.stringify(foldertitle)
              })
    const folderjson = await FolderObjectCreated.json()

    console.log(folderjson)

    if(folderjson.state){
      console.log(folderjson)
      //console.log(`${folderjson[0]} tested here`)
      //setfolderContent([...folderContent, {state:true,data:folderjson.folderfile}])
      setfolderContent({state:true,data:[{...folderjson.folderdata}, ...folderContent.data]})
      setfolderSelector(false)
      setfolderLoad(false)
      setfoldercalltrigger(true)
      setfolderExists(true)
    }
    else{
      setfolderLoad(false)
      setfolderExists(false)
    }
          
  }
  catch(error){

  }}
}


  return (
    <div style={{ height:'100vh',display:'flex',position:'relative',boxSizing:'border-box'}}>{
        folderExists==='none'?
        <div style={{width:"100%",height:'100%',display:"flex",justifyContent:'center',backgroundColor:'#6c9de6',alignItems:"center"}}>
            <i class="fa fa-spinner fa-spin" style={{fontSize:'200px',color:'#0d47a1'}}></i>
        </div>:
        <div style={{width:"100%",height:'100%',display:'flex'}}>
            <BioSection />
            
            {folderExists ? <Foldersection setfolderSelector={setfolderSelector} />: <NoFolders folderSelector={folderSelector} setfolderSelector={setfolderSelector}/>}
            { folderSelector && <Addfolder setShowError={setShowError} showError={showError} errObj={errObj} setfolderContent={setfolderContent} folderContent={folderContent} setfolderSelector={setfolderSelector} changeFieldData={changeFieldData} foldertitle={foldertitle} createFolder={createFolder} />}
            </div>}
    </div>
  )
}

export default UserPage