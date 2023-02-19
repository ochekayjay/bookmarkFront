import React,{useState,useContext} from 'react';
import LandingPage from './LandingPage';
import { NavLink,useNavigate} from 'react-router-dom';
import './signin.css'
import { Statecontext } from '../ContextBookmark';

function SignIn() {
  const [formObject,setformObject] = useState({Password:'',Email:''})
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const navigate = useNavigate()

  const changeFieldData = (event)=>{
    setformObject({...formObject,...{[event.target.name]:event.target.value}})
}


  const submitreg = async(event)=>{
    event.preventDefault()
    if(formObject.Password===''||formObject.Email===''){

    }
    else{
      try{
    console.log('a')
    const addCoinCredentials = await fetch('https://savemyfile.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify(formObject)
 })
 console.log('b')
 const payloadData = await addCoinCredentials.json()
 console.log(payloadData)
 window.localStorage.setItem('Userdata',JSON.stringify(payloadData))
 setuserPayload({id:payloadData._id,userName:payloadData.Username,email:payloadData.Email,token:payloadData.Token})
 navigate('/landingpage')
  }
  catch(error){

  }}
}


  





  return (
    <div><div style={{padding:'15px',backgroundColor:'#0d47a1',zIndex:"2",color:'white',boxSizing:"border-box",width:"100vw",height:"100vh",margin:'0px auto'}}>
    <div className='topSectionland'>
      <div style={{fontFamily:"NexaTextBold",display:"flex",alignItems:"center",justifyContent:"center",fontSize:'35px'}}>BookMark</div>
      <div className='authholder'><p className='pauth'><NavLink to='/' style={{textDecoration:'none',color:'white'}}>Home</NavLink></p><p  className='pauth'><NavLink to='/signup' style={{textDecoration:'none',color:'white'}}>Register</NavLink></p></div>
    </div>
    
    <div className='lowersectionland'>
        <div style={{height:"275px",width:"40%",boxSizing:"border-box",border:"2.5px solid white",borderRadius:"10px",backgroundColor:'#0d47a1'}}>
            <p style={{border:"1px solid white",borderWidth:'0px 0px 1px',display:"flex",justifyContent:'center',alignItems:'center',fontSize:"30px",letterSpacing:"1.5px",height:'20%'}}>buukmark</p>
            <div style={{height:'80%'}}>
              <div style={{height:"33.3%",width:'100%',margin:'0px auto',border:'1px solid white',borderWidth:'0px 0px 1px',display:'flex',justifyContent:'center',alignItems:'flex-end',position:'relative'}}><p style={{position:'absolute',color:'white',fontSize:'18px',fontFamily:'NexaTextLight',top:'5px',left:'5px'}}>Enter Email:</p><input onChange={(event)=> changeFieldData(event)} name="Email" value={formObject.Email} style={{width:'100%',fontSize:'25px',color:'white',height:'60%',backgroundColor:'transparent',borderWidth:'0px',paddingLeft:"15px",outline:'none'}} type="email"/></div>
              <div style={{height:"33.3%",width:'100%',margin:'0px auto',border:'1px solid white',borderWidth:'0px 0px 1px',display:'flex',justifyContent:'center',alignItems:'flex-end',position:'relative'}}><p style={{position:'absolute',color:'white',fontSize:'18px',fontFamily:'NexaTextLight',top:'5px',left:'5px'}}>Enter Password:</p><input onChange={(event)=> changeFieldData(event)} name="Password" value={formObject.Password} style={{width:'100%',fontSize:'25px',color:'white',height:'60%',paddingLeft:"15px",backgroundColor:'transparent',borderWidth:'0px',outline:'none'}} type="password"/></div>
              <div style={{height:"33.3%",display:"flex",justifyContent:'center',alignItems:"center"}}><input type='button'  onClick={(event)=>submitreg(event)} value='Sign in' style={{width:'80px',height:'30px',borderRadius:"15px",borderWidth:'0px'}}/></div>
            </div>
        </div>

    </div>
</div>
</div>
  )
}

export default SignIn