import { Statecontext } from '../../../../ContextBookmark'




export async function GetFolderTexts(folderId,userPayload){

  console.log('im tryying text endpoint')
    try{
        const textObjectCreated = await fetch(`https://savemyfile.onrender.com/text/${folderId}`,{
          method:'GET',
          headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userPayload.token}`,
                  },
                
                  })
        const textjson = await textObjectCreated.json()
        return textjson
        
      }
      catch(error){
          console.log(error)
      }
      
}

 


/*export async function GetAllTexts(){

    try{
        const textObjectCreated = await fetch(`https://savemyfile.onrender.com/text/getAllTexts`,{
          method:'GET',
          headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userPayload.token}`,
                  },
                
                  })
        const textjson = await textObjectCreated.json()
        if(textjson){
          setTextArray(textjson.allTexts)
        
        }
        else{
        }
                  console.log(textObjectCreated)
      }
      catch(error){
    
      }

      return null
}*/



export async function DeleteFolderText(userPayload,delid,folderId){
  try{
    const textDeleted = await fetch(`https://savemyfile.onrender.com/text/${delid}`,{
      method:'DELETE',
      headers:{
                
                Authorization: `Bearer ${userPayload.token}`,
                folderid: folderId
              
              },
            
              })
     const textjson = await textDeleted.json()
     return textjson
    
  }
  catch(error){
      console.log(error)
  }
}

const getText = async()=>{

}

