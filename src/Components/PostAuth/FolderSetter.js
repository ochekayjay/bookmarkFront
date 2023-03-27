
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
            const linkObj = await fetch('https://savemyfile.onrender.com/link/getAllLinks',{
              method:'GET',
              headers:{
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`
                      }
                      })
              const linkdat = await linkObj.json()

             return linkdat
             
                }
            catch(error){
                  console.log(error)
                    }
              }
    
      
              export async function TextCallFunc(token){
                try{
                const textObj = await fetch('https://savemyfile.onrender.com/text/getAllTexts',{
                  method:'GET',
                  headers:{
                            'Accept': 'application/json',
                            Authorization: `Bearer ${token}`
                          }
                          })
                  const textdat = await textObj.json()
              
                 return textdat
                    }
                catch(error){
                      console.log(error)
                        }
                  }

                  export async function ImageCallFunc(token){
                    try{
                    const imageObj = await fetch('https://savemyfile.onrender.com/image/getUserImages',{
                      method:'GET',
                      headers:{
                                'Accept': 'application/json',
                                Authorization: `Bearer ${token}`
                              }
                              })
                      const imagedat = await imageObj.json()

                      return imagedat

                    
                        }
                    catch(error){
                          console.log(error)
                            }
                      }

                  
        
          
        
        