import React, {useState} from "react";




const AddFolder  = ({changeFieldData, setfolderSelector ,createFolder, foldertitle})=>{

const [folderLoad,setFolderLoad] = useState(false)
const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
  const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"/></svg>
  

    return(
        <div style={{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.475)',boxSizing:'border-box',height:'100vh',width:'100%',zIndex:'100'}}>
              <div style={{width:'300px',height:'200px',borderRadius:'14px',boxShadow: '0px 0px 15px #0b1f36',backgroundColor:'#0d47a1',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',paddingTop:'40px'}}>
                  <div style={{borderRadius:'10px',height:'50px',boxShadow: '0px 0px 15px #0b1f36',width:'250px',margin:'15px auto',display:'flex'}}>
                      <input onChange={(event)=> changeFieldData(event)} name='name' value={foldertitle.name} placeholder='Folder title...' style={{boxSizing : 'border-box',height:'100%',paddingLeft:'7px',borderRadius:'10px',width:'100%',outline:'none',fontSize:'15px',backgroundColor:'transparent',borderWidth:'0px 0px 0px' ,color:'white'}}/>
                  </div>
                  {folderLoad?<p style={{width:"100%",boxSizing:'border-box',display:"flex",justifyContent:'center',alignItems:"center",marginTop:'30px'}}><i class="fa fa-spinner fa-spin" style={{fontSize:'30px',color:'white'}}></i></p>
                  :<div style={{display:'flex',justifyContent:'space-around'}}>
                      <p onClick={()=>{setFolderLoad(true);setfolderSelector(false)}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{cancelIcon}</p>
                      <p onClick={(event)=>{setFolderLoad(true); createFolder(event)}} style={{fontSize:'40px',cursor:'pointer',color:'white',height:'55px',width:'55px',boxShadow: '0px 0px 15px #0b1f36',display:'flex',alignItems:'center',borderRadius:'50%',justifyContent:'center',margin:'25px auto'}}>{addIcon}</p>
                  </div>}
              </div>
        </div>
    )
}

export default AddFolder