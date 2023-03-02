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

 


export async function GetAllTexts(){

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
}



export async function DeleteText(){

}

const getText = async()=>{

}

