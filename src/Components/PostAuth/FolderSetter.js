
/*export async function folderCallFunc(userPayload){
 
    try{
    const folderObj = await fetch('https://savemyfile.onrender.com/folder',{
      method:'GET',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`
              }
              })
      const folderdat = await folderObj.json()
      if(folderdat.folderdata.length === 0){
         return({exist:false})
          //setfolderExists(false)
      }
      else{
        return({exist:true,data:folderdat.folderdata})
        //setfolderExists(true)
        //setfolderContent(folderdat.folderdata)
      }
        }
    catch(error){

            }
    
      }*/

      

      export async function folderCallFunc(token){
        try{
        const folderObj = await fetch('https://savemyfile.onrender.com/folder',{
          method:'GET',
          headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                  }
                  })
          const folderdat = await folderObj.json()
          if(folderdat.folderdata.length === 0){
              return false
          }
          else{
            
            return {state:true,data:folderdat.folderdata}
          }
            }
        catch(error){
              console.log(error)
                }
          }
    
    
          export async function LinkCallFunc(token){
            try{
            const folderObj = await fetch('https://savemyfile.onrender.com/link/getAllLinks',{
              method:'GET',
              headers:{
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                      }
                      })
              const folderdat = await folderObj.json()

              if(folderdat.message){
                return {state:false,data:folderdat.message}
              }

             else if(folderdat.allLinks.length > 0){
                return {state:true,data:folderdat.allLinks}
                  
              }
             
                }
            catch(error){
                  console.log(error)
                    }
              }
    
      
              export async function TextCallFunc(token){
                try{
                const folderObj = await fetch('https://savemyfile.onrender.com/text/getAllTexts',{
                  method:'GET',
                  headers:{
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`
                          }
                          })
                  const folderdat = await folderObj.json()
              
                  if(folderdat.message){
                    return {state:false,data:folderdat.message}
                  }

                 else if(folderdat.allTexts.length > 0){
                    return {state:true,data:folderdat.allTexts}
                      
                  }
                    }
                catch(error){
                      console.log(error)
                        }
                  }

                  export async function ImageCallFunc(token){
                    try{
                    const folderObj = await fetch('https://savemyfile.onrender.com/image/getUserImages',{
                      method:'GET',
                      headers:{
                                'Accept': 'application/json',
                                Authorization: `Bearer ${token}`
                              }
                              })
                      const folderdat = await folderObj.json()

                      if(folderdat.message){
                        return {state:false,data:folderdat.message}
                      }
    
                     else if(folderdat.userImages.length > 0){
                        return {state:true,data:folderdat.userImages}
                          
                      }

                    
                        }
                    catch(error){
                          console.log(error)
                            }
                      }

                  
        
          
        
        