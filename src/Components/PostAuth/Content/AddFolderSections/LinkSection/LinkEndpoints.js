

export async function GetFolderLinks(folderId,userPayload){

    console.log('im tryying text endpoint')
      try{
          const linkObjectCreated = await fetch(`https://savemyfile.onrender.com/link/folder/${folderId}`,{
            method:'GET',
            headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userPayload.token}`,
                    },
                  
                    })
          const linkjson = await linkObjectCreated.json()
          return linkjson
          
        }
        catch(error){
            console.log(error)
        }
        
  }

  export async function DeleteFolderLink(userPayload,delid,folderId){
    try{
      const linkDeleted = await fetch(`https://savemyfile.onrender.com/link/${delid}`,{
        method:'DELETE',
        headers:{
                  
                  Authorization: `Bearer ${userPayload.token}`,
                  folderid: folderId
                },
              
                })
      const linkjson = await linkDeleted.json()
      return linkjson
      
    }
    catch(error){
        console.log(error)
    }
  }