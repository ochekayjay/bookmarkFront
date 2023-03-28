import { useContext, useState, useEffect,useRef } from "react";
import { Statecontext } from "../../../../ContextBookmark";
import { createImage } from "./ImageEndpoints";
import './imagesection.css'
const { navigator }  = window;

export function ImageSection({setaddItemToShow,ImageArray,setImageArray}) {
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const folderId = useContext(Statecontext).folderId[0]
    const [imageObj,setimageObj] = useState({myFile:''})
    const [imageState,setimageState] = useState({title:'',source:''});
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>
    const [folderLoad,setFolderLoad] = useState(false)
  
    const changeFieldData = (event)=>{
          event.preventDefault()
          setimageState({...imageState,...{[event.target.name]:event.target.value}})
          console.log(imageState)
      }
  
      //update images
      const updateImageObj = (event)=>{
       
        setimageObj({[event.target.name] : event.target.files[0]})
        console.log(imageObj)
        
    }


    //function to forward images
    const forwardImageObject = async()=>{
      try{
        await navigator.share({})
      }
      catch(error){
        console.log(error)
      }
    }

  //function to add images
  
  const createImage = async(event)=>{
      event.preventDefault()
      const formData = new FormData();
      formData.append('myFile', imageObj.myFile)
      formData.append('title',imageState.title)
      formData.append('source',imageState.source)
      if(imageState.title===''||imageState.source===''){
            console.log('empty')
      }
      else{
        console.log(formData)
      try{
        console.log('in posting image')
      const imageObjectCreated = await fetch(`https://savemyfile.onrender.com/image/imagePush`,{
        method:'POST',
        headers:{
                  Authorization: `Bearer ${userPayload.token}`,
                  folderid : folderId
                },
                body: formData
                })
      const imgjson = await imageObjectCreated.json()
      console.log(imgjson)
      if(imgjson.state){
        setImageArray({state:true,data:[...ImageArray.data,{...imgjson.imagedata}]})
        
        setaddItemToShow('none')
      }
      else{
        setImageArray({...ImageArray})
        setaddItemToShow('image')
      }
            
    }
    catch(error){
  
    }}
  }
  

  const fileref = useRef();

    
    return(
      <div className="imagesectionMain">
                <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                    <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                        <input onChange={(event)=> updateImageObj(event)} ref={fileref} type='file' id='myFile' name='myFile'  style={{boxSizing : 'border-box',marginTop:"15px",boxShadow: '0px 0px 15px #0b1f36',height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                        
                        <input onChange={(event)=> changeFieldData(event)} name='title' value={imageState.title} placeholder='title...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',height:'50px',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                        <input onChange={(event)=> changeFieldData(event)} name='source' value={imageState.source} placeholder='source...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',height:'50px',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
  
                    </div>
                    {folderLoad && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'30px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'30px',color:'white'}}></i></p>}
                      <div style={{display:'flex',justifyContent:'space-around'}}>
                        <p onClick={()=>{setFolderLoad(true) ;setaddItemToShow('none')}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                        <p onClick={(event)=>{setFolderLoad(true); createImage(event)}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                    </div>
                </div>
          </div>
    )
  }