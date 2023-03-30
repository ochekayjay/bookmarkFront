import React ,{useContext,useState,useEffect}from 'react'
import {Statecontext} from '../../ContextBookmark'
import useWindowResize from '../../../hooks/useWindowSize'
import { folderCallFunc , ImageCallFunc, TextCallFunc, LinkCallFunc,folderDeleteFunc } from '../FolderSetter'
import { LinkSearchFunc, TextSearchFunc, ImageSearchFunc } from '../searchContent'
import ViewImage from '../viewContent/ViewImage'
import ViewLink from '../viewContent/ViewLink'
import ViewText from '../viewContent/ViewText'


function Foldersection({setfolderSelector}) {
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const [searchvalue,setsearchvalue] = useContext(Statecontext).searchvalue
    const [menuMobile, setMenuMobile] = useContext(Statecontext).menuMobile
    const [folderLoad,setfolderLoad] = useContext(Statecontext).folderLoad
    const [sectionShow,setSectionShow] = useContext(Statecontext).sectionShow
    const [textArray, setTextArray] = useContext(Statecontext).textArray
    const [sectionLoad,setSectionLoad] = useContext(Statecontext).sectionLoad
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const [ImageArray, setImageArray] = useContext(Statecontext).ImageArray
    const [viewContent,setViewContent] = useState({type:'none',content:''})
    const [folderContent,setfolderContent] = useContext(Statecontext).folderContent
    const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
    const { width } = useWindowResize()

    const forward = <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" fill='#FFFFFF' width="25"><path d="M120 856V682q0-79 56-134.5T310 492h416L572 338l42-42 226 226-226 226-42-42 154-154H310q-54 0-92 38t-38 92v174h-60Z"/></svg>
    const del = <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" fill='#FFFFFF' width="25"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>

//function to open folder
const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#0d47a1"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>


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

//delete folder
const deleteFolder = async(obj)=>{
  
    setfolderLoad(true)
    
    const newFolders = await folderDeleteFunc(userPayload.token,obj._id)
    
    if(newFolders?.state){
      setfolderLoad(false)
      setfolderContent({state:true,data:newFolders.folderdata})
    }
    else{
      setfolderLoad(false)
      setfolderContent({state:false,data:[]})
    }
     
  }


  const shareImage = async(obj)=>{
    

    const image = await fetch(`https://savemyfile.onrender.com/image/getImage/${obj?.id?obj.id:obj._id}`,{
      'Accept': '*/*'
    })

    const blob = await image.blob()
    console.log(blob)

    const file = new File([blob],'image.jpg',{type: blob.type})
    console.log(file)
    const shareData = {
      files: [file],
      title: `${obj.title}`,
      text: `${obj.source}`
    }

    if(navigator.canShare(shareData)){
    
      await window.navigator.share(shareData)
}
else{
  console.log('not possible')
}


}



//function to share data
const shareLink = async(obj)=>{
    
  let shareObj = {title:obj.title,source:obj.source,description:obj.description,link:obj.link}
  let convertedObj = `title: ${shareObj.title}\nsource: ${shareObj.source}\ndescription: ${shareObj.description}\nurl: ${encodeURI(shareObj.link)}`
  const entireObj = {
    title: 'Link Data',
    text: convertedObj
  }
  if(navigator.canShare(entireObj)){
        await window.navigator.share(entireObj)
  }
  else{
    console.log('not possible')
  }
}

const shareText = async(obj)=>{
  
  const shareObj = {title:obj.title,source:obj.source,description:obj.description,text:obj.text}
  let convertedObj = `title: ${shareObj.title}\nsource: ${shareObj.source}\ndescription: ${shareObj.description}\ntext: ${shareObj.text}`
  const entireObj = {
    title: 'Text Data',
    text: convertedObj
  }
  if(navigator.canShare(entireObj)){
        await window.navigator.share(entireObj)
  }
  else{
    console.log('not possible')
  }
}

 
 


const openFolder = (folder)=>{
    setLinkArray({state:false,data:[]})
    setImageArray({state:false,data:[]})
    setTextArray({state:false,data:[]})
    setfolderId(folder._id);
    settriggerSection('section');
    setselectedFolder(folder)
    
}


//search folder
const folderSearchFunc = async(searchvalue)=>{
  try{
    
  const folderObj = await fetch(`https://savemyfile.onrender.com/folder/search?message=${searchvalue}`,{
    method:'GET',
    headers:{
              'Accept': 'application/json',
              Authorization: `Bearer ${userPayload.token}`
            }
            })
    const folderdat = await folderObj.json()
    
    if(!folderdat.state){
      setfolderContent({data:[...folderContent.data],state:false})  
      setfolderLoad(true)
        //setfolderExists(false)
    }
    else{
      setfolderContent({state:true,data:folderdat.folderdata})
      setfolderLoad(false)
    }
      }
  catch(error){
        console.log(error)
          }
    }
   


const changeSearch = async (e)=>{
    
    setsearchvalue(e.target.value)
    //console.log(searchvalue)
          if(e.target.value){
          
            folderSearchFunc(e.target.value)
          }
          else{
        
            const data = await folderCallFunc(userPayload.token)
          
            if(data.state){
          
                setfolderContent({state:true,data:data.folderdata})
                setfolderLoad(false)
                //console.log()
            }
            else{setfolderLoad(false)}
          }
          
 }


 //content searching

 const contentSearch = async (event,type)=>{

  setsearchvalue(event.target.value)


    if(type==='text'){
      if(event.target.value){

        setSectionLoad({...sectionLoad,text:true})
        const data = await TextSearchFunc(userPayload.token,event.target.value)
        
        if(data.state){
            setTextArray({state:true,data:data.textdata})
            setSectionLoad({...sectionLoad,text:false})
          
          
            //console.log()
        }
        else{setSectionLoad({...sectionLoad,text:true});setTextArray({state:false,data:[...textArray.data]});console.log('here')}
      }
      else{
        const textdata = await TextCallFunc(userPayload.token)

         if(textdata.state){
          setSectionLoad({...sectionLoad,text:false})
          setTextArray({state:true,data:textdata.textdata})
         }
      }
    }

    else if(type==='link'){
      if(event.target.value){
        setSectionLoad({...sectionLoad,link:true})
        const data = await LinkSearchFunc(userPayload.token,event.target.value)
    
        if(data.state){
            setLinkArray({state:true,data:data.linkdata})
            setSectionLoad({...sectionLoad,link:false})
          
          
            //console.log()
        }
        else{setSectionLoad({...sectionLoad,link:true});setLinkArray({state:false,data:[...linkArray.data]});}
     }
     else{
      const linkdata = await LinkCallFunc(userPayload.token)
      if(linkdata.state){
        setSectionLoad({...sectionLoad,link:false})
       setLinkArray({state:true,data:linkdata.linkdata})
      }
     }
    }

    else if(type==='image'){
      if(event.target.value){

        setSectionLoad({...sectionLoad,image:true})
        const data = await ImageSearchFunc(userPayload.token,event.target.value)
        
        if(data.state){
            setImageArray({state:true,data:data.imagedata})
            setSectionLoad({...sectionLoad,image:false})
          
          
            //console.log()
        }
        else{setSectionLoad({...sectionLoad,image:true});setImageArray({state:false,data:[...ImageArray.data]})}
      }
      else{
        const imagedata = await ImageCallFunc(userPayload.token)

         if(imagedata.state){
          setSectionLoad({...sectionLoad,image:false})
          setImageArray({state:true,data:imagedata.imagedata})
         }
      }
    }
  
  //console.log(searchvalue)
      
        
}



  return (
    <div style={{width:'100%',height:'100%',position:'relative',boxSizing:'border-box'}}>
        
        <div style={{overflow:"auto",padding:"10px",height:'30%',boxSizing:'border-box',width:"100%",marginTop:"0px"}}>
        <div style={{display:width>700?'none':"block",paddingBottom:'10px',position:"absolute",top:'5px',backgroundColor:"white",zIndex:"4",left:"5px",width:"100%",boxSizing:"border-box"}}>
            <p onClick={()=>setMenuMobile(!menuMobile)} style={{height:"40px",width:"40px",display:width>700?"none":'flex',justifyContent:"center",alignItems:"center",boxSizing:"border-box",marginTop:"5px",marginLeft:'5px',borderRadius:"50%",boxShadow: '0px 0px 5px #0b1f36'}}>{menuIcon}</p>   
        </div>
        <div style={{margin:width>700?"18px 0px 0px 18px":'40px 0px 0px 18px',boxSizing:"border-box",height:"90%",width:"100%",fontFamily:'NexaTextBold',boxSizing:"border-box",fontSize:'45px',letterSpacing:'2px'}}>
            
            <p style={{color:'#6c9de6',fontWeight:'400',fontSize:width>700?"45px":"30px"}}>Folder Section</p>
            <div style={{boxSizing:"border-box",fontSize:width>700?"30px":"15px",fontFamily:"NexaTextLight"}}>{folderContent.data.map(folder=><p style={{letterSpacing:'4px'}}>{folder.name}</p>)}</div>
            </div>
            
        </div>
        <div style={{boxSizing:'border-box',width:'100%',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36'}}>
            {sectionShow==='folder' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>FOLDERS</p><p onClick={()=>setfolderSelector(true)} className='smallbuttonToAddNewFolder'>+</p></div>
                <div style={{padding:'30px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                        {folderLoad && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                        {folderContent.data[0] && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input  placeholder='Search Folders' onChange={changeSearch} type='search' value={searchvalue} style={{width:width>700?'70%':"90%",marginTop:'15px',marginRight:'25px',paddingLeft:'10px',height:'45px',letterSpacing:'1.5px',fontSize:'13px',boxSizing:'border-box',outline:'none',color:'white',border:"1px solid #02050a", borderRadius:'9px',backgroundColor:'white',color:"black"}}/>
                        </div>}
                    <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"auto auto",padding:"10px"}}>
                        
                        {folderContent.state? folderContent.data.map(folder=><div  style={{width:`calc(50%-20px)`,margin:"10px",boxSizing:"border-box",height:'250px',borderRadius:'10px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#6c9de6',cursor:"pointer",color:'white',letterSpacing:'1.5px'}}>
                        <p style={{cursor:"pointer",height:'30%',width:'100%',padding:'15px 15px 0px 0px',boxSizing:'border-box',textAlign:'right'}}><span onClick={()=>deleteFolder(folder)} style={{cursor:'pointer'}}>{del}</span></p>
                        <div onClick={()=>openFolder(folder)} style={{height:'70%',boxSizing:'border-box',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <p style={{color:'white',fontWeight:"400",fontSize:width>700?"25px":"15px",letterSpacing:"1.5px"}}>{folder.name}</p>
                        </div>
                        </div>): folderLoad?<p> </p>:<p style={{color:"black",marginTop:"15px"}}>No Folder Available here!</p>}
                    </div>
                </div>
            </div>}
            {sectionShow==='text' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>TEXTS</p></div>
                <div style={{padding:width>700?'30px':'5px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                        {sectionLoad.text && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                       
                        {textArray.data[0] && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input  placeholder='Search Texts' onChange={(event)=>contentSearch(event,'text')} type='search' value={searchvalue} style={{width:width>700?'70%':"90%",marginTop:'15px',marginRight:'25px',paddingLeft:'10px',height:'45px',letterSpacing:'1.5px',fontSize:'13px',boxSizing:'border-box',outline:'none',color:'white',border:"1px solid #02050a", borderRadius:'9px',backgroundColor:'white',color:"black"}}/>
                        </div>}
                    <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"auto auto",padding:"10px"}}>
                        
                    {textArray.state? textArray.data.map(textObj => <div style={{width:`calc(50%-20px)`,borderRadius:'15px',backgroundColor:"#0d47a1",margin:"10px",padding:"15px",boxSizing:"border-box",}}>
                    <p style={{cursor:"pointer",width:'100%',paddingLeft:'15px',boxSizing:'border-box',textAlign:'right'}}><span onClick={()=>shareText(textObj)} style={{cursor:'pointer'}}>{forward}</span></p>
                     <div style={{boxShadow: '0px 0px 15px #0b1f36',color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px"}}>
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{textObj.title}</p>
                     </div>
                    <p>{textObj.text}</p>
                    <p>{textObj.source}</p>
                    <p>{textObj.description}</p>
                    </div>
                    <p onClick={()=>{setViewContent({type:'text',content:textObj})}} style={{width:'70px',cursor:'pointer',backgroundColor:'white',color:'#0d47a1',display:'flex',alignItems:"center",justifyContent:"center",height:"35px",borderRadius:'20px',border:"1px solid white",margin:'10px auto'}}>View</p>
                  </div>): sectionLoad.text?<p> </p>:<p style={{color:"black",marginTop:"15px"}}>No Text Document Available here!</p>}
                    </div>
                </div>
            </div>}
            {sectionShow==='link' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>LINKS</p></div>
                <div style={{padding:width>700?'30px':'5px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                {sectionLoad.link && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                       
                {linkArray.data[0] && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input  placeholder='Search Links' onChange={(event)=>contentSearch(event,'link')} type='search' value={searchvalue} style={{width:width>700?'70%':"90%",marginTop:'15px',marginRight:'25px',paddingLeft:'10px',height:'45px',letterSpacing:'1.5px',fontSize:'13px',boxSizing:'border-box',outline:'none',color:'white',border:"1px solid #02050a", borderRadius:'9px',backgroundColor:'white',color:"black"}}/>
                        </div>}

                       <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"1fr 1fr",padding:"10px"}}>
                           
                       {linkArray.state? linkArray.data.map(linkObj => <div key={linkObj._id} style={{width:'90%',backgroundColor:'#0d47a1',borderRadius:"15px",margin:"10px auto",boxSizing:"border-box",padding:'10px'}}>
                       <p style={{cursor:"pointer",width:'100%',paddingLeft:'15px',boxSizing:'border-box',textAlign:'right'}}><span onClick={()=>shareLink(linkObj)} style={{cursor:'pointer'}}>{forward}</span></p>
                    <div style={{boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{linkObj.title}</p>
                      
                    </div>
                    <p><a  target="_blank" href={linkObj.link} style={{textDecoration:'none',color:"white"}}>Visit Site</a></p>
                    <p>{linkObj.source}</p>
                    <p>{linkObj.description}</p>
                  </div>
                  <p onClick={()=>{setViewContent({type:'link',content:linkObj})}} style={{width:'70px',cursor:'pointer',backgroundColor:'white',color:'#0d47a1',display:'flex',alignItems:"center",justifyContent:"center",height:"35px",borderRadius:'20px',border:"1px solid white",margin:'10px auto'}}>View</p>
                  </div>): sectionLoad.link?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Link Document Available here!</p>}
                    </div>
                </div>
            </div>}

            {sectionShow==='image' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>IMAGES</p></div>
                <div style={{padding:width>700?'30px':'5px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                {sectionLoad.image && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                {ImageArray.data[0] && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input  placeholder='Search Images' onChange={(event)=>contentSearch(event,'image')} type='search' value={searchvalue} style={{width:width>700?'70%':"90%",marginTop:'15px',marginRight:'25px',paddingLeft:'10px',height:'45px',letterSpacing:'1.5px',fontSize:'13px',boxSizing:'border-box',outline:'none',color:'white',border:"1px solid #02050a", borderRadius:'9px',backgroundColor:'white',color:"black"}}/>
                        </div>}
                       <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"1fr 1fr",padding:"5px"}}>
                           
                       {ImageArray?.state? ImageArray.data.map(imgObj => <div style={{width:'90%',borderRadius:"15px",backgroundColor:"#0d47a1",margin:"10px auto",height:"auto",boxSizing:"border-box",padding:'15px'}}>
                      
                      <p style={{cursor:"pointer",width:'100%',paddingLeft:'15px',boxSizing:'border-box',textAlign:'right'}}><span onClick = {()=>{shareImage(imgObj)}} style={{cursor:'pointer'}}>{forward}</span></p>
    
                       <div style={{boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px",height:'auto'}}>
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{imgObj.title}</p>
                      
                    </div>
                    <p style={{textAlign:"left",}}>{imgObj.source}</p>
                    <p style={{width:'80%',margin:"5px auto",height:"200px"}}><img src = {`https://savemyfile.onrender.com/image/getImage/${imgObj?.id?imgObj.id:imgObj._id}`} style={{width:"100%",borderRadius:'15px',height:"100%",objectFit:"cover"}}/></p>
                  </div>
                  <p onClick={()=>{setViewContent({type:'image',content:imgObj})}} style={{width:'70px',cursor:'pointer',backgroundColor:'white',color:'#0d47a1',display:'flex',alignItems:"center",justifyContent:"center",height:"35px",borderRadius:'20px',border:"1px solid white",margin:'10px auto'}}>View</p>
                  </div>) : sectionLoad.image?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Image Document Available here!</p>}
                    </div>
                </div>
            </div>}
        </div>

      {viewContent.type==='text' && <ViewText viewContent={viewContent} setViewContent={setViewContent}/>}
      {viewContent.type==='link' && <ViewLink viewContent={viewContent} setViewContent={setViewContent}/>}
      {viewContent.type==='image' && <ViewImage viewContent={viewContent} setViewContent={setViewContent}/>}

    </div>
  )
}

export default Foldersection