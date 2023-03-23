import React ,{useContext,useState,useEffect}from 'react'
import {Statecontext} from '../../ContextBookmark'
import useWindowResize from '../../../hooks/useWindowSize'
import { folderCallFunc , ImageCallFunc, TextCallFunc, LinkCallFunc } from '../FolderSetter'


function Foldersection({folderContent, setfolderSelector, setfolderContent}) {
    const [folderId,setfolderId] = useContext(Statecontext).folderId
    const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
    const [selectedFolder,setselectedFolder] = useContext(Statecontext).selectedFolder
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const [searchvalue,setsearchvalue] = useState('')
    const [menuMobile, setMenuMobile] = useContext(Statecontext).menuMobile
    const [folderLoad,setfolderLoad] = useState(false)
    const [sectionShow,setSectionShow] = useContext(Statecontext).sectionShow
    const [textArray, setTextArray] = useContext(Statecontext).textArray
    const [sectionLoad,setSectionLoad] = useContext(Statecontext).sectionLoad
    const [linkArray, setLinkArray] = useContext(Statecontext).linkArray
    const [ImageArray, setImageArray] = useContext(Statecontext).ImageArray
    const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
    const { width } = useWindowResize()

//function to open folder
const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#0d47a1"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>



 
 


const openFolder = (folder)=>{
    setLinkArray([])
    setImageArray([])
    setTextArray([])
    setfolderId(folder._id);
    settriggerSection('section');
    setselectedFolder(folder)
    
}


const changeSearch = async (e)=>{
    
    setsearchvalue(e.target.value)
    //console.log(searchvalue)
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
          
          if(folderdat.length === 0){
            console.log(folderdat.length)   
            setfolderLoad(true)
              //setfolderExists(false)
          }
          else{
            setfolderContent(folderdat)
            setfolderLoad(false)
          }
            }
        catch(error){
              console.log(error)
                }
          }
          if(e.target.value===''){
            const data = await folderCallFunc(userPayload.token)
            console.log(data)
            if(data?.state){
                setfolderContent(data.data)
                setfolderLoad(false)
                //console.log()
            }
            else{console.log('here')}
          }
          else{
            folderSearchFunc(e.target.value)
          }
          
 }



  return (
    <div style={{width:'100%',height:'100%',position:'relative',boxSizing:'border-box'}}>
        
        <div style={{overflow:"auto",padding:"10px",height:'30%',boxSizing:'border-box',width:"100%",marginTop:"0px"}}>
        <div style={{display:width>700?'none':"block",paddingBottom:'10px',position:"absolute",top:'5px',backgroundColor:"white",zIndex:"4",left:"5px",width:"100%",boxSizing:"border-box"}}>
            <p onClick={()=>setMenuMobile(!menuMobile)} style={{height:"40px",width:"40px",display:width>700?"none":'flex',justifyContent:"center",alignItems:"center",boxSizing:"border-box",marginTop:"5px",marginLeft:'5px',borderRadius:"50%",boxShadow: '0px 0px 50px #0b1f36'}}>{menuIcon}</p>   
        </div>
        <div style={{margin:width>700?"18px 0px 0px 18px":'40px 0px 0px 18px',boxSizing:"border-box",height:"90%",width:"100%",fontFamily:'NexaTextBold',boxSizing:"border-box",fontSize:'45px',letterSpacing:'2px'}}>
            
            <p style={{color:'#6c9de6',fontWeight:'400',fontSize:width>700?"45px":"30px"}}>Folder Section</p>
            <div style={{boxSizing:"border-box",fontSize:width>700?"30px":"15px",fontFamily:"NexaTextLight"}}>{folderContent.map(folder=><p style={{letterSpacing:'4px'}}>{folder.name}</p>)}</div>
            </div>
            
        </div>
        <div style={{boxSizing:'border-box',width:'100%',height:'70%',borderRadius:'20px 20px 0px 0px',boxShadow: '0px 0px 15px #0b1f36'}}>
            {sectionShow==='folder' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>FOLDERS</p><p onClick={()=>setfolderSelector(true)} className='smallbuttonToAddNewFolder'>+</p></div>
                <div style={{padding:'30px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                        {folderLoad && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                        <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <input  placeholder='Search Folders' onChange={changeSearch} type='search' value={searchvalue} style={{width:width>700?'70%':"90%",marginTop:'15px',marginRight:'25px',paddingLeft:'10px',height:'45px',letterSpacing:'1.5px',fontSize:'13px',boxSizing:'border-box',outline:'none',color:'white',border:"1px solid #02050a", borderRadius:'9px',backgroundColor:'white',color:"black"}}/>
                        </div>
                    <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"auto auto",padding:"10px"}}>
                        
                        {folderContent.map(folder=><div onClick={()=>openFolder(folder)} style={{width:`calc(50%-20px)`,margin:"10px",boxSizing:"border-box",height:'250px',borderRadius:'10px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'#6c9de6',cursor:"pointer",color:'white',letterSpacing:'1.5px'}}>
                        <p style={{color:'white',fontWeight:"400",fontSize:width>700?"25px":"15px",letterSpacing:"1.5px"}}>{folder.name}</p>
                        
                        </div>)}
                    </div>
                </div>
            </div>}
            {sectionShow==='text' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>TEXTS</p></div>
                <div style={{padding:'30px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                        {sectionLoad.text && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                       
                    <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"auto auto",padding:"10px"}}>
                        
                    {textArray[0]? textArray.map(textObj => <div style={{width:`calc(50%-20px)`,margin:"10px",padding:"15px",boxSizing:"border-box",}}>
                     <div style={{boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px"}}>
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{textObj.title}</p>
                     </div>
                    <p>{textObj.text}</p>
                    <p>{textObj.source}</p>
                    <p>{textObj.description}</p>
                    </div>
                  </div>): sectionLoad.text?<p> </p>:<p style={{color:"black",marginTop:"15px"}}>No Text Document Available here!</p>}
                    </div>
                </div>
            </div>}
            {sectionShow==='link' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>LINKS</p></div>
                <div style={{padding:'30px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                {sectionLoad.link && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                       
                       <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"1fr 1fr",padding:"10px"}}>
                           
                       {linkArray[0]? linkArray.map(linkObj => <div key={linkObj._id} style={{width:'100%',margin:"10px",boxSizing:"border-box",padding:"15px"}}>
                    <div style={{boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{linkObj.title}</p>
                      
                    </div>
                    <p><a  target="_blank" href={linkObj.link} style={{textDecoration:'none',color:"white"}}>Visit Site</a></p>
                    <p>{linkObj.source}</p>
                    <p>{linkObj.description}</p>
                  </div>
                  </div>): sectionLoad.link?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Link Document Available here!</p>}
                    </div>
                </div>
            </div>}

            {sectionShow==='image' && <div style={{width:'100%',fontFamily:'NexaTextLight',boxSizing:'border-box',height:'100%',boxShadow: '0px 0px 15px #0b1f36',borderWidth:'0px 0px 0.3px',borderRadius:'20px 20px 0px 0px'}}>
                <div style={{border:'',height:'10%',border:'0.1px solid black',borderWidth:'0px 0px 0.1px',display:'flex',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontSize:'40px',borderRadius:'20px 20px 0px 0px'}}><p style={{color:'#6c9de6',fontWeight:'850'}}>IMAGES</p></div>
                <div style={{padding:'30px',height:'90%',overflow:"auto",boxSizing:"border-box"}}>
                {sectionLoad.image && <div style={{height:"auto",width:width>700?"80%":"90%",margin:"30px auto",display:"flex",justifyContent:"center",alignItems:"center"}}><i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#6c9de6'}}></i></div>}
                       
                       <div style={{color:'black',display:width>700?"grid":"flex",flexDirection:'column',gridTemplateColumns:"1fr 1fr",padding:"10px"}}>
                           
                       {ImageArray[0]? ImageArray.map(imgObj => <div style={{width:'100%',margin:"10px",height:"auto",boxSizing:"border-box",padding:'15px'}}>
                       <div style={{boxShadow: '0px 0px 15px #0b1f36',backgroundColor:"#0d47a1",color:"white",margin:"10px 0px",borderRadius:"15px",padding:"15px",height:'auto'}}>
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                      <p style={{fontFamily:"NexaTextBold",marginBottom:"10px"}}>{imgObj.title}</p>
                      
                    </div>
                    <p style={{textAlign:"left",}}>{imgObj.source}</p>
                    <p style={{width:'80%',margin:"5px auto",height:"200px"}}><img src = {`https://savemyfile.onrender.com/image/getImage/${imgObj?.id?imgObj.id:imgObj._id}`} style={{width:"100%",borderRadius:'15px',height:"100%",objectFit:"cover"}}/></p>
                  </div>
                  </div>) : sectionLoad.image?<p> </p>:<p style={{color:"black",marginTop:'15px'}}>No Image Document Available here!</p>}
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Foldersection