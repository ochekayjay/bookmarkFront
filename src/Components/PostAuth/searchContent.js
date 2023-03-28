
export async function TextSearchFunc(token,message){
    try{
    const textObj = await fetch(`https://savemyfile.onrender.com/text/search?message=${message}`,{
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

      export async function LinkSearchFunc(token,message){
        try{
        const linkObj = await fetch(`https://savemyfile.onrender.com/link/search?message=${message}`,{
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

      export async function ImageSearchFunc(token,message){
        try{
        const imageObj = await fetch(`https://savemyfile.onrender.com/image/search?message=${message}`,{
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

      



