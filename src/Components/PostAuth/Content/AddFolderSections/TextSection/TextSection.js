import { Statecontext } from "../../../../ContextBookmark";
import React, {useContext, useState, useEffect} from "react";
import './textsection.css'
import ErrorPage from "../../../../errorHolder/ErrorPage";


const TextSection  = ({ textArray, setaddItemToShow,setTextArray})=>{
    const [textState,setTextState] = useState({text:'',description:'',title:''})
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const folderId = useContext(Statecontext).folderId[0]
    const [folderLoad,setFolderLoad] = useState(false)
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>
    const [showError,setShowError] = useState(false)
   const [errObj,setErrObj] = useContext(Statecontext).errObj
    

    const changeFieldData = (event)=>{
        event.preventDefault()
        setTextState({...textState,...{[event.target.name]:event.target.value}})
    }


  //function to add texts

  const createText = async(event)=>{
    event.preventDefault()
    if(textState.text===''||textState.description===''||textState.title===''){
      setFolderLoad(false)
      setShowError(true)
      setErrObj({status:'fill',message:'fill neccessary fields'})
    }
    else{

    try{
    const textObjectCreated = await fetch('https://savemyfile.onrender.com/text/createText',{
      method:'POST',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`,
                folder: folderId
              },
              body: JSON.stringify(textState)
              })
    const textjson = await textObjectCreated.json()
    console.log(textjson)
    if(textjson.state){
      console.log(textjson)
      setFolderLoad(false)
      setTextArray({state:true,data:[{...textjson.textdata}, ...textArray.data]})
      setaddItemToShow('none')
    }
    else{
      setaddItemToShow('text')
    }
            
  }
  catch(error){

  }}
}






    return(
    <div className="textsectionMain">
              {showError && <ErrorPage status={errObj.status} message={errObj.message} setShowError={setShowError} showError={showError}/>}
              <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='text' value={textState.text} placeholder='text...' style={{boxSizing : 'border-box',marginTop:"15px",height:'50px',boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <textarea onChange={(event)=> changeFieldData(event)} name='description' value={textState.description} placeholder='description...' style={{boxSizing : 'border-box',height:'130px',padding:"7px",marginTop:"15px",height:'50px',boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}>{textState.description}</textarea>
                      <input onChange={(event)=> changeFieldData(event)} name='title' value={textState.title} placeholder='title...' style={{boxSizing : 'border-box',height:'50px',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      

                  </div>
                  {folderLoad && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'30px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'30px',color:'white'}}></i></p>}
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>{setFolderLoad(false);setaddItemToShow('none')}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>{setFolderLoad(true);createText(event)}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
  )
}





export default TextSection