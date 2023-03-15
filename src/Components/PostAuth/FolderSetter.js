
export async function folderCallFunc(userPayload){
 
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
    
      }

      