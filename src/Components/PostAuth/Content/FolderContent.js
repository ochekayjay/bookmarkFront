import React, {useContext,useState,useEffect} from 'react'
import {Statecontext} from '../../ContextBookmark'
import Foldersection from './Foldersection'
import Contentsection from './Contentsection'
import useWindowResize from '../../../hooks/useWindowSize'

function FolderContent({setfolderSelector}) {
    
    const [folderColors,setfolderColors] = useContext(Statecontext).folderColors
    const [triggerSection,settriggerSection] = useContext(Statecontext).triggerSection
    const folderlogo = <svg xmlns="http://www.w3.org/2000/svg" height="80" width="80" fill={folderColors[0]}><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;
    const imageIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M10 29.458q-1.125 0-1.958-.833-.834-.833-.834-1.958V6.125q0-1.125.834-1.958.833-.834 1.958-.834h9.583l2.792 2.792h13.167q1.125 0 1.958.813.833.812.833 1.937v17.792q0 1.125-.833 1.958t-1.958.833Zm0-2.791h25.542V8.875H21.208l-2.791-2.75H10v20.542ZM33.625 35H4.458q-1.125 0-1.958-.833-.833-.834-.833-1.959V8.875h2.791v23.333h29.167ZM14.292 22.458h17l-5.542-7.375-4.542 6-3.083-3.583ZM10 26.667V6.125v20.542Z"/></svg>
    const textIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M7.792 35q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5h15.916v2.792H7.792v24.416h24.416V16.292H35v15.916q0 1.125-.833 1.959-.834.833-1.959.833Zm5.583-6.583v-2.792h13.292v2.792Zm0-5.209v-2.75h13.292v2.75Zm0-5.166V15.25h13.292v2.792Zm15.292-3.167v-3.542h-3.542V8.542h3.542V5h2.791v3.542H35v2.791h-3.542v3.542Z"/></svg>
    const linkIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 28.333h-6.958q-3.459 0-5.896-2.437Q3.333 23.458 3.333 20q0-3.458 2.438-5.896 2.437-2.437 5.896-2.437h6.958v2.791h-6.958q-2.334 0-3.938 1.604Q6.125 17.667 6.125 20q0 2.292 1.604 3.917t3.938 1.625h6.958Zm-5.167-6.958v-2.75h13.084v2.75Zm7.917 6.958v-2.791h6.958q2.334 0 3.938-1.604 1.604-1.605 1.604-3.938 0-2.292-1.604-3.917t-3.938-1.625h-6.958v-2.791h6.958q3.459 0 5.896 2.437 2.438 2.438 2.438 5.896 0 3.458-2.438 5.896-2.437 2.437-5.896 2.437Z"/></svg>
    const addIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill='#FFFFFF'><path d="M18.625 31.667V21.375H8.333v-2.75h10.292V8.333h2.75v10.292h10.292v2.75H21.375v10.292Z"/></svg>;
    const { width } = useWindowResize()
    
    return (<div style={{width:width>700?'75%':'100%',height:'100%'}}>
  {triggerSection==='folder'?<Foldersection setfolderSelector={setfolderSelector} />:<Contentsection/>}
  </div>
  )
}

/*
                <div style={{width:'33.3%',border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%',overflow:'auto',position:'relative'}}>
                    <p style={{display:'flex',color:'white',alignItems:'center',justifyContent:'space-around',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderRadius:'20px 0px 0px 0px',borderWidth:'0px 0px 1px 0px',backgroundColor:'#0d47a1',position:'sticky',top:'0px',left:'0px',zIndex:'10'}}><span style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><span>Links</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{linkIcon}</span></span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{addIcon}</span></p>
                    <div style={{textAlign:'center',padding:'15px',fontSize:'25px',paddingTop:'35px'}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
                </div>
                <div style={{width:'33.3%',border:'1px solid black',borderWidth:'0px 1px 0px 0px',height:'100%',overflow:'auto'}}>
                    <p style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderWidth:'0px 0px 1px 0px'}}><span>Texts</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{textIcon}</span></p>
                </div>
                <div style={{width:'33.3%',height:'100%',overflow:'auto'}}>
                    <p style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'25px',width:'100%',height:'50px',border:'1px solid black',borderWidth:'0px 0px 1px 0px'}}><span>Images</span><span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{imageIcon}</span></p>
                </div>}
*/

export default FolderContent