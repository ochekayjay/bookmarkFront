import React from 'react'

function NoFolders({setfolderSelector}) {
    const newfoldericon = <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>;



  return (
    <div style={{color:'black',width:'75%'}}>
          <div style={{width:'70%',margin:'30px auto'}}>
            <p style={{fontFamily:'NexaTextBold',fontSize:'70px',colot:'black'}}>You have no folder yet on your project</p>
            <div className='addNewFolder'>
              <p className='buttonToAddNewFolder' onClick={()=>setfolderSelector(true)}>{newfoldericon}</p>
            </div>
          </div>
        </div>
  )
}

export default NoFolders