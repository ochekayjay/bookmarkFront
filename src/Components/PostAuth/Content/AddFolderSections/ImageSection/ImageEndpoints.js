

export async function GetFolderImage(folderId,userPayload){
    
    try{
    const imageObjectCreated = await fetch(`https://savemyfile.onrender.com/images/getFolderImages`,{
      method:'GET',
      headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userPayload.token}`,
                folderid: folderId
              },
    
              })
    const imagejson = await imageObjectCreated.json()
    if(imagejson){
      return imagejson
    }
    else{
      
    }

  }
  catch(error){

  }
}
