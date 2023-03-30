

import React, {useState,useEffect,useContext} from 'react'
import { Statecontext } from '../../../../ContextBookmark';
import './linksection.css'
import ErrorPage from '../../../../errorHolder/ErrorPage';

function LinkSection({setaddItemToShow}) {
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const [linkState,setlinkState] = useState({link:'',description:'',title:'',source:''});
    const folderId = useContext(Statecontext).folderId[0]
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [folderLoad,setFolderLoad] = useState(false)
    const [showError,setShowError] = useState(false)
   const [errObj,setErrObj] = useContext(Statecontext).errObj
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>


    //function to add Links
    const createLink = async(event)=>{
      const linkdata = {'linkholder':linkState}
      event.preventDefault()
      if(linkState.link===''||linkState.title===''){
        setFolderLoad(false)
        setShowError(true)
        setErrObj({status:'fill',message:'fill neccessary fields'})
      }
      else{
        
      try{
      const linkObjectCreated = await fetch('https://savemyfile.onrender.com/link/createLink',{
        method:'POST',
        headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userPayload.token}`,
                  folderid: folderId
                },
                body: JSON.stringify(linkState)
                })
      const linkjson = await linkObjectCreated.json()
      console.log(linkjson)
      console.log(folderId)
      if(linkjson.state){
        
      setLinkArray({state:true,data:[...linkArray.data,{...linkjson.linkdata}]})
      setaddItemToShow('none')
      }
      else{
        setLinkArray({...linkArray})
        setaddItemToShow('link')
      }
                console.log(linkjson)
    }
    catch(error){
  
    }}
  }






    const changeFieldData = (event)=>{
        event.preventDefault()
        setlinkState({...linkState,...{[event.target.name]:event.target.value}})
    }
    

  return (
    <div className='linksectionMain'>
              {showError && <ErrorPage status={errObj.status} message={errObj.message} setShowError={setShowError} showError={showError}/>}
              <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='link' value={linkState.link} placeholder='link...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='description' value={linkState?.description} placeholder='description...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='title' value={linkState.title} placeholder='title...' style={{boxSizing : 'border-box',height:'50px',marginTop:"15px",boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='source' value={linkState?.source} placeholder='source...' style={{boxSizing : 'border-box',height:'50px',marginTop:"15px",paddingLeft:'7px',boxShadow: '0px 0px 15px #0b1f36',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>

                  </div>
                  {folderLoad && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'30px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'30px',color:'white'}}></i></p>}
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>{setFolderLoad(true);setaddItemToShow('none')}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>{setFolderLoad(true);createLink(event)}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
  )
}

export default LinkSection
