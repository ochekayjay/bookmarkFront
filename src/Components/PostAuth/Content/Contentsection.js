import React,{useState,useContext,useEffect} from 'react'
import { Statecontext } from '../../ContextBookmark'
import LinkSection from './AddFolderSections/LinkSection/LinkSection'
import { Addtexts, Addimages } from '../Additem'
import TextSection from '../Content/AddFolderSections/TextSection/TextSection'
import { ImageSection } from './AddFolderSections/ImageSection/ImageSection'
import {GetFolderTexts,DeleteFolderText,GetAllTexts} from './AddFolderSections/TextSection/TextEndpoints'
import {GetFolderLinks,DeleteFolderLink} from './AddFolderSections/LinkSection/LinkEndpoints'
import { GetFolderImage, DeleteFolderImage } from './AddFolderSections/ImageSection/ImageEndpoints'
import useWindowResize from '../../../hooks/useWindowSize'
import './contentSection.css'

function Contentsection() {
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const [addItemToShow,setaddItemToShow] = useContext(Statecontext).addItemToShow
    const [contentMobile, setContentMobile] = useState({link:true,text:false,image:false})
    const [textArray, setTextArray] = useContext(Statecontext).textArray
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const [itemState,setItemState] = useState({link:false,text:false,image:false})
    const [ImageArray, setImageArray] = useContext(Statecontext).ImageArray
    const imageIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M10 29.458q-1.125 0-1.958-.833-.834-.833-.834-1.958V6.125q0-1.125.834-1.958.833-.834 1.958-.834h9.583l2.792 2.792h13.167q1.125 0 1.958.813.833.812.833 1.937v17.792q0 1.125-.833 1.958t-1.958.833Zm0-2.791h25.542V8.875H21.208l-2.791-2.75H10v20.542ZM33.625 35H4.458q-1.125 0-1.958-.833-.833-.834-.833-1.959V8.875h2.791v23.333h29.167ZM14.292 22.458h17l-5.542-7.375-4.542 6-3.083-3.583ZM10 26.667V6.125v20.542Z"/></svg>
    const textIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M7.792 35q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5h15.916v2.792H7.792v24.416h24.416V16.292H35v15.916q0 1.125-.833 1.959-.834.833-1.959.833Zm5.583-6.583v-2.792h13.292v2.792Zm0-5.209v-2.75h13.292v2.75Zm0-5.166V15.25h13.292v2.792Zm15.292-3.167v-3.542h-3.542V8.542h3.542V5h2.791v3.542H35v2.791h-3.542v3.542Z"/></svg>
    const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 28.333h-6.958q-3.459 0-5.896-2.437Q3.333 23.458 3.333 20q0-3.458 2.438-5.896 2.437-2.437 5.896-2.437h6.958v2.791h-6.958q-2.334 0-3.938 1.604Q6.125 17.667 6.125 20q0 2.292 1.604 3.917t3.938 1.625h6.958Zm-5.167-6.958v-2.75h13.084v2.75Zm7.917 6.958v-2.791h6.958q2.334 0 3.938-1.604 1.604-1.605 1.604-3.938 0-2.292-1.604-3.917t-3.938-1.625h-6.958v-2.791h6.958q3.459 0 5.896 2.437 2.438 2.438 2.438 5.896 0 3.458-2.438 5.896-2.437 2.437-5.896 2.437Z"/></svg>
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const forward = <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" fill='#FFFFFF' width="25"><path d="M120 856V682q0-79 56-134.5T310 492h416L572 338l42-42 226 226-226 226-42-42 154-154H310q-54 0-92 38t-38 92v174h-60Z"/></svg>
    const del = <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" fill='#FFFFFF' width="25"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>
    const { width } = useWindowResize()
  //function to add link to folder
  const linkAdder = ()=>{
      setaddItemToShow('link')
  }


  //function to add images to folder

  const imageAdder = ()=>{
    setaddItemToShow('image')
  }

  //function to add text to folder

  const textAdder = ()=>{
    setaddItemToShow('text')
  }
 
  const formatString = (data)=>{
        return data.replace(/\s/g, '%20')
  }

  //function to share data
  const shareLink = async(obj)=>{
    
    let shareObj = {title:obj.title,source:obj.source,description:obj.description,link:obj.link}
    let convertedObj = `title: ${formatString(shareObj.title)}\nsource: ${formatString(shareObj.source)}\ndescription: ${formatString(shareObj.description)}\nurl: ${encodeURI(shareObj.link)}`
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
    let convertedObj = `title: ${formatString(shareObj.title)}\nsource: ${formatString(shareObj.source)}\ndescription: ${formatString(shareObj.description)}\ntext: ${formatString(shareObj.text)}`
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
  /*

   */

  useEffect( ()=>{
    
  
    
   const fixFolder = async()=>{
    setItemState({image:true,text:true,link:true})
    const textjson = await GetFolderTexts(folderId,userPayload)
    const linkjson = await GetFolderLinks(folderId,userPayload)
    const imagejson = await GetFolderImage(folderId,userPayload)
    //console.log(`trying out in images ${imagejson.folderImages[0].nameofimage}`)
    //console.log(`images here ${imagejson.folderImages[0].image}`)
    //console.log(textjson.folderTexts.length)
    console.log(textjson)
    console.log(linkjson)
    console.log(imagejson)
    
    textjson.state?setTextArray({state:true,data:textjson.textdata}):setTextArray({state:false,data:[]}) 
    linkjson.state?setLinkArray({state:true,data:linkjson.linkdata}):setLinkArray({state:false,data:[]}) 
    imagejson.state?setImageArray({state:true,data:imagejson.imagedata}):setImageArray({state:false,data:[]}) 
    setItemState({image:false,text:false,link:false})
    
    }

  fixFolder()
  
},[]) 

//delete function

const deleteItem = async(item,obj)=>{
    if(item==='link'){
      setItemState({...itemState,...{link:true}})
      const newLinks = await DeleteFolderLink(userPayload,obj._id,folderId)
      setItemState({...itemState,...{link:false}})
      if(newLinks.state){
        setLinkArray({state:true,data:newLinks.linkdata})
      }
      else{
        setLinkArray({state:false,data:[]})
      }
      
    }
    else if(item==='text'){
      setItemState({...itemState,...{text:true}})
      const newTexts = await DeleteFolderText(userPayload,obj._id,folderId)
      if(newTexts.state){
        setItemState({...itemState,...{text:false}})
        setTextArray({state:true,data:newTexts.textdata})
      }
      else{
        setItemState({...itemState,...{text:false}})
        setTextArray({state:false,data:''})
      }
      
    }

    else if(item==='image'){
      setItemState({...itemState,...{image:true}})
      let identity = obj?.id?obj.id:obj._id
      const newImages = await DeleteFolderImage(userPayload,identity,folderId)
      
      if(newImages.state){
        setItemState({...itemState,...{image:false}})
        setImageArray({state:true,data:newImages.imagedata})
      }
      else{
        setItemState({...itemState,...{image:false}})
        setImageArray({state:false,data:[]})
      }
      
    }
}

const backToFolder = ()=>{
  settriggerSection('folder')
  setfolderId('')
  setImageArray({state:false,data:[]})
  setLinkArray({state:false,data:[]})
  setTextArray({state:false,data:[]})
}
  

  
  
    return (
    <div style={{width:'100%',height:'100%',position:'relative',boxSizing:"border-box"}}>
      
    <div style={{position:'absolute',top:'0px',left:'0px',height:'30%',boxSizing:'border-box'}}>
    <p onClick={()=>backToFolder()} style={{borderRadius:'7px',marginTop:'20px',marginLeft:'20px',width:'150px',height:'45px',color:'white',display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:'#0d47a1',boxShadow: '0px 0px 10px #0b1f36',cursor:'pointer'}}>back to folder</p>
        <div style={{margin:'18px 0px 0px 18px',fontFamily:'NexaTextBold',fontSize:'45px',letterSpacing:'2px'}}>
         <p style={{fontSize:width>800?'45px':"25px"}}>{selectedFolder.name}</p>
        </div>
    </div>
    
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',position:'absolute',bottom:'0px',left:'0px',boxSizing:'border-box',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36',width:'100%'}}>
                <div style={{width:"100%",height:'5%',display:"flex"}}>
                    <p  style={{display:'flex',cursor:'pointer',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:width>800?'1px solid black':"1px solid white",borderRadius:'20px 0px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span  onClick={()=>{setContentMobile({link:true,text:false,image:false})}} style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span style={{fontSize:width>700?"25px":"15px"}}>Links</span><span style={{display:width>700?'flex':"none",alignItems:'center',justifyContent:'center'}}>{linkIcon}</span></span><span onClick={()=>linkAdder()} style={{display:width>700?'flex':contentMobile.link?"flex":"none",alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                    <p style={{display:'flex',cursor:'pointer',border:width>800?'1px solid black':"1px solid white",borderWidth:"0px 1px 1px 1px",color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',borderRadius:'0px 0px 0px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span onClick={()=>{setContentMobile({link:false,text:true,image:false})}} style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span style={{fontSize:width>700?"25px":"15px"}}>Texts</span><span style={{display:width>700?'flex':"none",alignItems:'center',justifyContent:'center'}}>{textIcon}</span></span><span onClick={()=>textAdder()} style={{display:width>700?'flex':contentMobile.text?"flex":'none',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                    <p  style={{display:'flex',cursor:'pointer',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:width>800?'1px solid black':"1px solid white",borderRadius:' 0px 20px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span onClick={()=>{setContentMobile({link:false,text:false,image:true})}} style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span style={{fontSize:width>700?"25px":"15px"}}>Images</span><span style={{display:width>700?'flex':"none",alignItems:'center',justifyContent:'center'}}>{imageIcon}</span></span><span onClick={()=>imageAdder()} style={{display:width>700?'flex':contentMobile.image?"flex":"none",alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                </div>
                <div style={{width:"100%",display:'flex',height:'95%',border:"1px solid black",padding:"10px 0px",boxSizing:"border-box"}}>
                <div style={{width:width>700?'33.3%':"100%",display:width>700?'block':contentMobile.link?"block":"none",border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%',overflow:'auto',position:'relative'}}>
                    
                    <div style={{width:"100%",padding:'15px',boxSizing:"border-box",display:'flex',flexDirection:"column",alignItems:"center"}}>
                    {itemState.link && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'15px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'blue'}}></i></p>}
                  {linkArray.state? linkArray.data.map(linkObj => <div key={linkObj._id} style={{width:'95%',padding:"15px",boxSizing:"border-box",boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{linkObj.title}</p>
                      <p style={{cursor:"pointer"}}><span onClick={()=>deleteItem('link',linkObj)} style={{cursor:'pointer'}}>{del}</span>&nbsp; &nbsp;&nbsp;<span onClick={()=>shareLink(linkObj)} style={{cursor:'pointer'}}>{forward}</span></p>
                    </div>
                    <p><a  target="_blank" href={linkObj.link} style={{textDecoration:'none',color:"white"}}>Visit Site</a></p>
                    <p>{linkObj.source}</p>
                    <p>{linkObj.description}</p>
                  </div>): itemState.link?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Link Document Available here!</p>}
                </div>
                </div>
                <div style={{width:width>700?'33.3%':"100%",display:width>700?'block':contentMobile.text?"block":"none",border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%'}}>
                
                <div style={{width:"100%",padding:'15px',boxSizing:"border-box",display:'flex',flexDirection:"column",alignItems:"center",height:"100%",overflow:"auto"}}>
                {itemState.text && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'15px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'blue'}}></i></p>}
                  {textArray.state? textArray.data.map(textObj => <div style={{width:'95%',padding:"15px",boxSizing:"border-box",boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px"}}>
                     <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{textObj.title}</p>
                      <p style={{cursor:"pointer"}}><span style={{cursor:'pointer'}} onClick={()=>deleteItem('text',textObj)} >{del}</span>&nbsp; &nbsp;&nbsp;<span style={{cursor:'pointer'}} onClick={()=>shareText(textObj)}>{forward}</span></p>
                     </div>
                    <p>{textObj.text}</p>
                    <p>{textObj.source}</p>
                    <p>{textObj.description}</p>
                  </div>): itemState.text?<p> </p>:<p style={{color:"black",marginTop:"15px"}}>No Text Document Available here!</p>}
                </div>
                </div>
                
                <div style={{width:width>700?'33.3%':"100%",display:width>700?'block':contentMobile.image?"block":"none",height:'100%'}}>
                    
                    <div style={{width:"100%",padding:'15px',boxSizing:"border-box",display:'flex',flexDirection:"column",alignItems:"center",height:'100%',overflow:'auto'}}>
                    {itemState.image && <p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'15px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'blue'}}></i></p>}
                  {ImageArray.state? ImageArray.data.map(imgObj => <div style={{width:'95%',height:"auto",padding:"15px",boxSizing:"border-box",boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px"}}>
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{imgObj.title}</p>
                      <p style={{cursor:"pointer"}}><span onClick={()=>deleteItem('image',imgObj)}  style={{cursor:'pointer'}}>{del}</span>&nbsp; &nbsp;&nbsp;<span style={{cursor:'pointer'}}>{forward}</span></p>
                      
                    </div>
                    <p style={{textAlign:"left",}}>{imgObj.source}</p>
                    <p style={{width:'100%',marginTop:"15px"}}><img src = {`https://savemyfile.onrender.com/image/getImage/${imgObj?.id?imgObj.id:imgObj._id}`} style={{width:"100%",borderRadius:'15px',height:"150px",objectFit:"cover"}}/></p>
                  </div>) : itemState.image?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Image Document Available here!</p>}
                </div>
                </div>
                </div>
      </div>
      {addItemToShow==='link' && <LinkSection setaddItemToShow={setaddItemToShow} linkArray={linkArray} setLinkArray={setLinkArray}/> }
      {addItemToShow==='text' && <TextSection setaddItemToShow={setaddItemToShow} textArray={textArray} setTextArray={setTextArray}/> }
      {addItemToShow==='image' && <ImageSection setaddItemToShow={setaddItemToShow} ImageArray={ImageArray} setImageArray={setImageArray}/> }
      
        
    </div>
  )
}

export default Contentsection