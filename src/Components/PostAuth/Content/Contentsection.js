import React,{useState,useContext,useEffect} from 'react'
import { Statecontext } from '../../ContextBookmark'
import LinkSection from './AddFolderSections/LinkSection/LinkSection'
import { Addtexts, Addimages } from '../Additem'
import TextSection from '../Content/AddFolderSections/TextSection/TextSection'
import {GetFolderTexts,DeleteText,GetAllTexts} from './AddFolderSections/TextSection/TextEndpoints'
import {GetFolderLinks} from './AddFolderSections/LinkSection/LinkEndpoints'

function Contentsection() {
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const [addItemToShow,setaddItemToShow] = useContext(Statecontext).addItemToShow
    const [textArray, setTextArray] = useContext(Statecontext).textArray
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const imageIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M10 29.458q-1.125 0-1.958-.833-.834-.833-.834-1.958V6.125q0-1.125.834-1.958.833-.834 1.958-.834h9.583l2.792 2.792h13.167q1.125 0 1.958.813.833.812.833 1.937v17.792q0 1.125-.833 1.958t-1.958.833Zm0-2.791h25.542V8.875H21.208l-2.791-2.75H10v20.542ZM33.625 35H4.458q-1.125 0-1.958-.833-.833-.834-.833-1.959V8.875h2.791v23.333h29.167ZM14.292 22.458h17l-5.542-7.375-4.542 6-3.083-3.583ZM10 26.667V6.125v20.542Z"/></svg>
    const textIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M7.792 35q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5h15.916v2.792H7.792v24.416h24.416V16.292H35v15.916q0 1.125-.833 1.959-.834.833-1.959.833Zm5.583-6.583v-2.792h13.292v2.792Zm0-5.209v-2.75h13.292v2.75Zm0-5.166V15.25h13.292v2.792Zm15.292-3.167v-3.542h-3.542V8.542h3.542V5h2.791v3.542H35v2.791h-3.542v3.542Z"/></svg>
    const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 28.333h-6.958q-3.459 0-5.896-2.437Q3.333 23.458 3.333 20q0-3.458 2.438-5.896 2.437-2.437 5.896-2.437h6.958v2.791h-6.958q-2.334 0-3.938 1.604Q6.125 17.667 6.125 20q0 2.292 1.604 3.917t3.938 1.625h6.958Zm-5.167-6.958v-2.75h13.084v2.75Zm7.917 6.958v-2.791h6.958q2.334 0 3.938-1.604 1.604-1.605 1.604-3.938 0-2.292-1.604-3.917t-3.938-1.625h-6.958v-2.791h6.958q3.459 0 5.896 2.437 2.438 2.438 2.438 5.896 0 3.458-2.438 5.896-2.437 2.437-5.896 2.437Z"/></svg>
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
  
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
 
  /*

   */

  useEffect( ()=>{
    console.log('abcd')
  
    console.log('in trig')
   const fixFolder = async()=>{
    console.log('babab')
    const textjson = await GetFolderTexts(folderId,userPayload)
    const linkjson = await GetFolderLinks(folderId,userPayload)
    setTextArray(textjson.folderTexts)
    setLinkArray(linkjson.folderLinks)
    }

  fixFolder()
  
},[]) 
  
  
  
  
    return (
    <div style={{width:'100%',height:'100%',position:'relative'}}>
      
    <div style={{position:'absolute',top:'0px',left:'0px',height:'30%',boxSizing:'border-box'}}>
    <p onClick={()=>settriggerSection('folder')} style={{borderRadius:'7px',marginTop:'20px',marginLeft:'20px',width:'150px',height:'45px',color:'white',display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:'#0d47a1',boxShadow: '0px 0px 10px #0b1f36',cursor:'pointer'}}>back to folder</p>
        <div style={{margin:'18px 0px 0px 18px',fontFamily:'NexaTextBold',fontSize:'45px',letterSpacing:'2px'}}>
         <p>{selectedFolder.name}</p>
        </div>
    </div>
    
    <div style={{display:'flex',justifyContent:'space-between',position:'absolute',bottom:'0px',left:'0px',boxSizing:'border-box',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36',width:'100%'}}>
                <div style={{width:'33.3%',border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%',overflow:'auto',position:'relative'}}>
                    <p style={{display:'flex',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderRadius:'20px 0px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span>Links</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{linkIcon}</span></span><span onClick={()=>linkAdder()} style={{display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                    <div style={{width:"100%",padding:'15px',boxSizing:"border-box",display:'flex',flexDirection:"column",alignItems:"center"}}>
                  {linkArray.map(linkObj => <div style={{width:'95%',padding:"15px",boxSizing:"border-box",boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px"}}>
                    <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{linkObj.title}</p>
                    <p>{linkObj.link}</p>
                    <p>{linkObj.source}</p>
                    <p>{linkObj.description}</p>
                  </div>)}
                </div>
                </div>
                <div style={{width:'33.3%',border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%',overflow:'auto'}}>
                <p style={{display:'flex',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderRadius:'0px 0px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span>Texts</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{textIcon}</span></span><span onClick={()=>textAdder()} style={{display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                <div style={{width:"100%",padding:'15px',boxSizing:"border-box",display:'flex',flexDirection:"column",alignItems:"center"}}>
                  {textArray.map(textObj => <div style={{width:'95%',padding:"15px",boxSizing:"border-box",boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px"}}>
                    <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{textObj.title}</p>
                    <p>{textObj.text}</p>
                    <p>{textObj.source}</p>
                    <p>{textObj.description}</p>
                  </div>)}
                </div>
                </div>
                <div style={{width:'33.3%',height:'100%',overflow:'auto'}}>
                    <p style={{display:'flex',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderRadius:' 0px 20px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span>Images</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{imageIcon}</span></span><span onClick={()=>imageAdder()} style={{display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>{addIcon}</span></p>
                    
                </div>
      </div>
      {addItemToShow==='link' && <LinkSection setaddItemToShow={setaddItemToShow} linkArray={linkArray} setLinkArray={setLinkArray}/> }
      {addItemToShow==='text' && <TextSection setaddItemToShow={setaddItemToShow} textArray={textArray} setTextArray={setTextArray}/> }
      {addItemToShow==='image' && <Addimages setaddItemToShow={setaddItemToShow}/> }
      
        
    </div>
  )
}

export default Contentsection