import React,{useState,useEffect,useContext} from 'react'
import BioSection from './BioSection'
import './userPage.css'
import NoFolders from './NoFolders'
import { Statecontext } from '../ContextBookmark'
import FolderContent from './Content/FolderContent'

function UserPage() {
  const [folderSelector,setfolderSelector] = useState(false)
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const [folders,setfolders] = useContext(Statecontext).folders
  const [foldertitle,setfoldertitle] = useState({name:''});
  const [folderExists,setfolderExists] = useContext(Statecontext).folderExists
  const [folderContent,setfolderContent] = useContext(Statecontext).folderContent
  
  const [foldercalltrigger,setfoldercalltrigger] = useState(false)
  const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
  const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
  const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>
  
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
  setuserPayload({...userPayload})

},[])


  const folderCallFunc = async()=>{
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
      if(folderdat.folderdata.length === 0){
          setfolderExists(false)
      }
      else{
        console.log(folderdat)
        setfolderExists(true)
        setfolderContent(folderdat.folderdata)
      }
        }
    catch(error){

            }
    
      }

  useEffect(()=>{ folderCallFunc()
      },[userPayload.token,foldercalltrigger])

  //change function to create title of folder

  const changeFieldData = (event)=>{
      event.preventDefault()
      setfoldertitle({[event.target.name]:event.target.value})
  }


  










  
  //function to create folder
  const createFolder = async(event)=>{
    event.preventDefault()
    if(foldertitle.name===''){
          console.log('empty')
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
    if(folderjson.success){
      setfolderSelector(false)
      setfoldercalltrigger(true)
      setfolderExists(true)
    }
    else{
      setfolderExists(false)
    }
              console.log(FolderObjectCreated)
  }
  catch(error){

  }}
}


  return (
    <div style={{ height:'100vh',display:'flex',position:'relative',boxSizing:'border-box'}}>
        <BioSection />
        {!folderExists && <NoFolders folderSelector={folderSelector} setfolderSelector={setfolderSelector}/>}
        {folderExists && <FolderContent />}
        { folderSelector &&
        <div style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.475)',boxSizing:'border-box',height:'100vh',width:'100%',zIndex:'100'}}>
              <div style={{width:'300px',height:'200px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'50px',boxShadow: '0px 0px 15px #0b1f36',width:'250px',margin:'15px auto',display:'flex'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='name' value={foldertitle.name} placeholder='Folder title...' style={{boxSizing : 'border-box',height:'100%',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>setfolderSelector(false)} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>createFolder(event)} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
        }
    </div>
  )
}

export default UserPage