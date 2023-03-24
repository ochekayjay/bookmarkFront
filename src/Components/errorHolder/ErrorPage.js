import React from 'react'
import './errorPage.css'

function ErrorPage({status,message,setShowError,showError}) {
    const closeicon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>
    const badNetwork = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill='#ffcccb'><path d="M24 42-.05 18q4.95-4.8 11.075-7.4Q17.15 8 24 8t12.925 2.6Q43 13.2 48 18l-1.75 1.75q-1.25-1.3-2.9-1.975t-3.6-.675q-3.9 0-6.65 2.75-2.75 2.75-2.75 6.65 0 1.95.7 3.525T33.1 32.9Zm15.75-1.5q-.75 0-1.275-.525-.525-.525-.525-1.275 0-.75.525-1.275Q39 36.9 39.75 36.9q.75 0 1.275.525.525.525.525 1.275 0 .75-.525 1.275-.525.525-1.275.525Zm-1.15-5.7q0-2.1.4-3.35t1.95-2.4q1.3-.95 1.75-1.675.45-.725.45-1.675 0-1.3-.875-2.125T40 22.75q-1.45 0-2.4.725t-1.55 1.975L34 24.2q.8-1.9 2.35-3T40 20.1q2.4 0 4.025 1.55 1.625 1.55 1.625 3.9 0 1.55-.625 2.65-.625 1.1-1.925 2.15-1.45 1.15-1.825 1.975-.375.825-.375 2.475Z"/></svg>
    const heartbreak = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill='#ffcccb'><path d="M24.05 43.8Q17.3 37 13.325 32.85q-3.975-4.15-6.05-6.875Q5.2 23.25 4.6 21.3 4 19.35 4 17q0-4.6 3.2-7.8T15 6q2.25 0 4.35.825 2.1.825 3.75 2.375L20 20h6.05l-2.3 19.15L30.1 18H24l3.55-10.6q1.25-.7 2.625-1.05Q31.55 6 33 6q4.6 0 7.8 3.2T44 17q0 2.3-.575 4.225Q42.85 23.15 40.8 25.9t-6 6.9q-3.95 4.15-10.75 11Zm-3-7.2 1.6-13.6H16l3.65-12.7q-1.1-.55-2.25-.925T15 9q-3.3 0-5.65 2.35Q7 13.7 7 17q0 1.65.625 3.275t2.2 3.825q1.575 2.2 4.3 5.175Q16.85 32.25 21.05 36.6Zm6.8-.9q7-6.8 10.075-11.175Q41 20.15 41 17q0-3.3-2.35-5.65Q36.3 9 33 9q-.75 0-1.525.15-.775.15-1.475.4L28.2 15h5.85Zm6.2-20.7ZM16 23Z"/></svg>
    return (
    <div className='errorMain'>
        
        <div className='errorSection'>
        <p onClick={()=>setShowError(!showError)} style={{width:'30px',border:'1px solid white',cursor:'pointer',height:"30px",borderRadius:'50%',marginTop:"10px",marginLeft:'10px',display:'flex',justifyContent:"center",alignItems:'center'}}>
                {closeicon}
            </p>
            <div style={{width:'90%',margin:'5px auto', height:'75%'}}>
            <p style={{fontSize:"15px",letterSpacing:"2px",textAlign:"center",paddingTop:"15px"}}>{message}</p>
            <div style={{marginTop:'15px',display:'flex',justifyContent:"center",alignItems:"center"}}>
                <p>{status==='error'?heartbreak:badNetwork}</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage