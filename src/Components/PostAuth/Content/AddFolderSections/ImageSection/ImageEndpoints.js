

export async function GetFolderImage(folderId,userPayload){
  
    
    try{
    const imageObjectCreated = await fetch(`https://savemyfile.onrender.com/image/getFolderImages`,{
      method:'GET',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`,
                folderid: folderId
              },
    
              })
    const imagejson = await imageObjectCreated.json()
  
      return imagejson
   

  }
  catch(error){

  }
}


export async function DeleteFolderImage(userPayload,delid,folderId){
  try{
    const imageDeleted = await fetch(`https://savemyfile.onrender.com/image/${delid}`,{
      method:'DELETE',
      headers:{
                
                Authorization: `Bearer ${userPayload.token}`,
                folderid: folderId
              
              },
            
              })
     const deletedjson = await imageDeleted.json()
     return deletedjson
    
  }
  catch(error){
      console.log(error)
  }
}