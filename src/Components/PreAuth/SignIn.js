import React,{useState,useContext, useEffect} from 'react';
import LandingPage from './LandingPage';
import { NavLink,useNavigate} from 'react-router-dom';
import './signin.css'
import { Statecontext } from '../ContextBookmark';
import useWindowResize from '../../hooks/useWindowSize';
import ErrorPage from '../errorHolder/ErrorPage';

function SignIn() {
  const [formObject,setformObject] = useState({Password:'',Email:''})
  const [userPayload,setuserPayload] = useContext(Statecontext).userPayload
  const [loading,setLoading] = useState(false)
  const [showError,setShowError] = useState(false)
  const [errObj,setErrObj] = useContext(Statecontext).errObj
  const navigate = useNavigate()
  const { width } = useWindowResize()

  const changeFieldData = (event)=>{
    setformObject({...formObject,...{[event.target.name]:event.target.value}})
}




  const submitreg = async(event)=>{
    event.preventDefault()
    if(formObject.Password===''||formObject.Email===''){

    }
    else{
      setLoading(true)
      try{
    
    const addCoinCredentials = await fetch('https://savemyfile.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify(formObject)
 })
 
 const payloadData = await addCoinCredentials.json()
 
 if(payloadData?.status==='error'){
  setErrObj(payloadData)
  setShowError(!showError)
 }
 else{
 window.localStorage.setItem('Userdata',JSON.stringify(payloadData))
 setuserPayload({id:payloadData._id,userName:payloadData.Username,email:payloadData.Email,token:payloadData.Token})
 navigate('/landingpage')
 }
 
  }
  catch(error){
    
      setErrObj({status:'poor Internet',message:'poor internet connection.'})
      setShowError(!showError)
  }}
}

useEffect(()=>{
setLoading(false)
},[showError])


  





  return (
    <div style={{position:"relative",height:"100vh",backgroundColor:'#0d47a1',padding:showError?"0px":width>700?"50px":'15px',color:'white',boxSizing:"border-box",width:"100vw",margin:'0px auto'}}>
    {showError && <ErrorPage status={errObj.status} message={errObj.message} setShowError={setShowError} showError={showError}/>}
    <div className='topSectionland'>
      <div style={{fontFamily:"NexaTextBold",display:"flex",alignItems:"center",justifyContent:"center",fontSize:'35px'}}>BookMark</div>
      <div className='authholder'><p className='pauth'><NavLink to='/' style={{textDecoration:'none',color:'white'}}>Home</NavLink></p><p  className='pauth'><NavLink to='/signup' style={{textDecoration:'none',color:'white'}}>Register</NavLink></p></div>
    </div>
    
    <div className='lowersectionland'>
        <div style={{height:width>700?"275px":"300px",width:width>700?"40%":"95%",boxSizing:"border-box",border:width>700?"2.5px solid white":'',borderRadius:"10px",backgroundColor:'#0d47a1'}}>
            <p style={{border:"1px solid white",borderWidth:'0px 0px 1px',display:"flex",justifyContent:'center',alignItems:'center',fontSize:"30px",letterSpacing:"1.5px",height:'20%'}}>buukmark</p>
            <div style={{height:'80%',display:width>700?'block':'flex',flexDirection:'column',justifyContent:"space-between"}}>
              <div style={{height:width>700?"33.3%":"27%",width:'100%',margin:'0px auto',border:'1px solid white',borderWidth:'0px 0px 1px',display:'flex',justifyContent:'center',alignItems:'flex-end',position:'relative'}}><p style={{position:'absolute',color:'white',fontSize:width>700?"18px":'13px',fontFamily:'NexaTextLight',top:'5px',left:'5px'}}>Enter Email:</p><input onChange={(event)=> changeFieldData(event)} name="Email" value={formObject.Email} style={{width:'100%',fontSize:'20px',fontFamily:'NexaTextLight',color:'white',height:'60%',backgroundColor:'transparent',borderWidth:'0px',paddingLeft:"15px",outline:'none'}} type="email"/></div>
              <div style={{height:width>700?"33.3%":"27%",width:'100%',margin:'0px auto',border:'1px solid white',borderWidth:'0px 0px 1px',display:'flex',justifyContent:'center',alignItems:'flex-end',position:'relative'}}><p style={{position:'absolute',color:'white',fontSize:width>700?"18px":'13px',fontFamily:'NexaTextLight',top:'5px',left:'5px'}}>Enter Password:</p><input onChange={(event)=> changeFieldData(event)} name="Password" value={formObject.Password} style={{width:'100%',fontSize:'20px',fontFamily:'NexaTextLight',color:'white',height:'60%',paddingLeft:"15px",backgroundColor:'transparent',borderWidth:'0px',outline:'none'}} type="password"/></div>
              <div style={{height:width>700?"33.3%":"27%",display:'flex',justifyContent:'center',alignItems:'center'}}><p  className='loadbuttonSignin' onClick={(event)=>submitreg(event)}>{ loading=== false? 'Sign in' :<i class="fa fa-spinner fa-spin" style={{fontSize:'20px',color:'#0d47a1'}}></i>}</p></div>
            </div>
        </div>
    </div>
    
</div>


  )
}

export default SignIn