import React, {useState, createContext} from 'react';




export const Statecontext = createContext();

export const StateHolder = (props)=> {

    const [alertobj,setalertobj] = useState({pass:false,message:'',trigger:false})
    const [userPayload,setuserPayload] = useState({id:'',userName:'',email:'',token:''})
    const [userObject,setuserObject] = useState({userEmail:'',userUsername:'',token:'',exp:0})
    const [folderExists,setfolderExists] = useState('none')
    const [addItemToShow,setaddItemToShow] = useState('none')
    const [folderContent,setfolderContent] = useState([])
    const [folderColors,setfolderColors] = useState(['#D0E7E5','#258481',"#E6568D",'#857555'])
    const [selectedFolder,setselectedFolder] = useState()
    const [triggerSection,settriggerSection]  = useState('folder')
    const [menuMobile, setMenuMobile] = useState(false)
    const [folderId,setfolderId] = useState('')
    const [textArray, setTextArray] = useState([])
    const [linkArray, setLinkArray] = useState([])
    const [ImageArray, setImageArray] = useState([])
    const [errObj,setErrObj] = useState()

    const [folders,setfolders] = useState()
    

    return(
        <Statecontext.Provider value={{
     userObject:[userObject,setuserObject],addItemToShow:[addItemToShow,setaddItemToShow],triggerSection:[triggerSection,settriggerSection],folderContent:[folderContent,setfolderContent],folders:[folders,setfolders],folderExists:[folderExists,setfolderExists],alertobj:[alertobj,setalertobj],userPayload:[userPayload,setuserPayload],
     folderColors:[folderColors,setfolderColors],folderId:[folderId,setfolderId],selectedFolder:[selectedFolder,setselectedFolder],textArray:[textArray, setTextArray],linkArray:[linkArray, setLinkArray],ImageArray:[ImageArray, setImageArray],menuMobile:[menuMobile, setMenuMobile],errObj:[errObj,setErrObj]}}>
            {props.children}
        </Statecontext.Provider>
    )
}

//coin={coinheader==='first'?coins: coinheader==='second'? coins.slice(0,3): coinheader==='third'? coins.slice(4,7): coins.slice(8,11)}