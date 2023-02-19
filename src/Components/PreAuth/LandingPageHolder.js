import React from 'react'
import LandingPage from './LandingPage';
import {NavLink} from 'react-router-dom'
import './landingpageholder.css'

function LandingPageHolder() {
  return (
    <div style={{backgroundColor:'#0d47a1'}}>
        <div style={{padding:'15px',zIndex:"2",color:'white',boxSizing:"border-box",width:"100vw",height:"100vh",margin:'0px auto'}}>
          <div className='topSectionland'>
            <div style={{fontFamily:"NexaTextBold",display:"flex",alignItems:"center",justifyContent:"center",fontSize:'35px'}}>BookMark</div>
            <div className='authholder'><p className='pauth'><NavLink to='/signin' style={{textDecoration:'none',color:'white'}}>Sign In</NavLink></p><p  className='pauth'><NavLink to='/signup' style={{textDecoration:'none',color:'white'}}>Register</NavLink></p></div>
          </div>
          <div className='lowersectionland'>
              <div style={{height:"auto",width:"50%",boxSizing:"border-box"}}>
                  <p className='welcome'>Welcome to Buukmark,here you can:</p>
                  <p className='landinstruction' >-&nbsp;Save and bookmark important screenshots</p>
                  <p className='landinstruction' >-&nbsp;Save and bookmark memorable texts</p>
                  <p className='landinstruction' >-&nbsp;Save and bookmark important links</p>
              </div>

          </div>
      </div>
    
    </div>
  )
}

export default LandingPageHolder