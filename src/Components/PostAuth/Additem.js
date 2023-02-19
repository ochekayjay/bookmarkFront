import React, {useState,useEffect,useContext} from 'react'
import { Statecontext } from '../ContextBookmark';

function Additem({setaddItemToShow}) {
    const [linkState,setlinkState] = useState({link:'',description:'',title:'',source:''});
    const folderId = useContext(Statecontext).folderId[0]
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload



    //function to add Links
    const createLink = async(event)=>{
      const linkdata = {'linkholder':linkState}
      event.preventDefault()
      if(linkState.link===''||linkState.description===''||linkState.title===''||linkState.source===''){
            console.log('empty')
      }
      else{
        console.log(linkState)
      try{
      const linkObjectCreated = await fetch(`https://savemyfile.onrender.com/folder/${folderId}/links?folder=${folderId}`,{
        method:'POST',
        headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userPayload.token}`
                },
                body: JSON.stringify(linkdata)
                })
      const linkjson = await linkObjectCreated.json()
      console.log(linkjson)
      console.log(folderId)
      if(linkjson.success){
        setaddItemToShow('none')
      }
      else{
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
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
  const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>
  return (
    <div style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.475)',boxSizing:'border-box',height:'100vh',width:'100%',zIndex:'100'}}>
              <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='link' value={linkState.link} placeholder='link...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='description' value={linkState.description} placeholder='description...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='title' value={linkState.title} placeholder='title...' style={{boxSizing : 'border-box',height:'50px',marginTop:"15px",boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='source' value={linkState.source} placeholder='source...' style={{boxSizing : 'border-box',height:'50px',marginTop:"15px",paddingLeft:'7px',boxShadow: '0px 0px 15px #0b1f36',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>

                  </div>
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>setaddItemToShow('none')} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>createLink(event)} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
  )
}

export default Additem


export function Addtexts({setaddItemToShow}) {
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const folderId = useContext(Statecontext).folderId[0]
    const [textState,settextState] = useState({text:'',description:'',title:'',source:''});
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>

    

    const changeFieldData = (event)=>{
        event.preventDefault()
        settextState({...textState,...{[event.target.name]:event.target.value}})
    }


  //function to add texts

  const createText = async(event)=>{
    event.preventDefault()
    if(textState.text===''||textState.description===''||textState.title===''||textState.source===''){
          console.log('empty')
    }
    else{

    try{
    const textObjectCreated = await fetch(`https://savemyfile.onrender.com/folder/${folderId}/texts?folder=${folderId}`,{
      method:'POST',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`
              },
              body: JSON.stringify(textState)
              })
    const linkjson = await textObjectCreated.json()
    if(linkjson.success){
      setaddItemToShow('none')
    }
    else{
      setaddItemToShow('text')
    }
              console.log(textObjectCreated)
  }
  catch(error){

  }}
}






    return(
    <div style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.475)',boxSizing:'border-box',height:'100vh',width:'100%',zIndex:'100'}}>
              <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='text' value={textState.text} placeholder='text...' style={{boxSizing : 'border-box',marginTop:"15px",height:'50px',boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='description' value={textState.description} placeholder='description...' style={{boxSizing : 'border-box',marginTop:"15px",height:'50px',boxShadow: '0px 0px 15px #0b1f36',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='title' value={textState.title} placeholder='title...' style={{boxSizing : 'border-box',height:'50px',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='source' value={textState.source} placeholder='source...' style={{boxSizing : 'border-box',height:'50px',boxShadow: '0px 0px 15px #0b1f36',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>

                  </div>
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>setaddItemToShow('none')} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>createText(event)} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
  )
}


export function Addimages({setaddItemToShow}) {
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const folderId = useContext(Statecontext).folderId[0]
  const [imageState,setimageState] = useState({nameofimage:'',title:'',source:''});
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>


  const changeFieldData = (event)=>{
        event.preventDefault()
        setimageState({...imageState,...{[event.target.name]:event.target.value}})
    }

//function to add images

const createImage = async(event)=>{
    event.preventDefault()
    if(imageState.nameofimage===''||imageState.title===''||imageState.source===''){
          console.log('empty')
    }
    else{

    try{
    const imageObjectCreated = await fetch(`https://savemyfile.onrender.com/folder/${folderId}/images/imagePush`,{
      method:'POST',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`
              },
              body: JSON.stringify(imageState)
              })
    const linkjson = await imageObjectCreated.json()
    if(linkjson.success){
      setaddItemToShow('none')
    }
    else{
      setaddItemToShow('image')
    }
              console.log(imageObjectCreated)
  }
  catch(error){

  }}
}

  
  return(
    <div style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.475)',boxSizing:'border-box',height:'100vh',width:'100%',zIndex:'100'}}>
              <div style={{width:'300px',height:'500px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'auto',width:'250px',margin:'15px auto'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='nameofimage' value={imageState.nameofimage} placeholder='nameOfImage...' style={{boxSizing : 'border-box',marginTop:"15px",boxShadow: '0px 0px 15px #0b1f36',height:'50px',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      
                      <input onChange={(event)=> changeFieldData(event)} name='title' value={imageState.title} placeholder='title...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',height:'50px',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                      <input onChange={(event)=> changeFieldData(event)} name='source' value={imageState.source} placeholder='source...' style={{boxSizing : 'border-box',boxShadow: '0px 0px 15px #0b1f36',height:'50px',marginTop:"15px",paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>

                  </div>
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>setaddItemToShow('none')} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>createImage(event)} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>
              </div>
        </div>
  )
}