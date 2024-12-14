import {React, useState} from 'react'
import './EditModal.css'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { Button } from '@aws-amplify/ui-react'

const EditModal = ({user, onUpload}) => {
    
    const [pfpFile, setPfpFile] = useState()
    const [bannerFile, setBannerFile] = useState();
    const [bio, setBio] = useState(user.bio)
    const [name, setName] = useState(user.fullName)

    const submit = async event => {
      
        event.preventDefault()

        const formData = new FormData();
        formData.append("pfp", pfpFile)
        formData.append("banner", bannerFile)
        formData.append("bio", bio)
        formData.append("name", name)
        formData.append("userId", jwtDecode(Cookies.get('loginAuth')).userId)
        //Insert API push here

        try{
        const response = await fetch('https://knule.duckdns.org/users/updateProfile', {
          method: 'PUT',
          body: formData
        })
        console.log("The response finished")
        console.log(response);
		    document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';

      }catch(err){
        console.log(err)
      }

        onUpload();
        
        


        //Need to find a way to refresh the page AFTER doing everything...
        //Maybe force refresh after it all? Else need to add functionality to 
        //Make the update in profile when new data appears.

        //Maybe add an "X" button over the modal that will close the app
        //by updating the state back in profile.jsx? Would probably be a
        //"Only render when true" situation. Would also isolate profile
        //AND WOULD BE A DESIGN PRINCIPLE :O
    }

    const closeModal = () =>{
      onUpload();
      document.getElementsByClassName('splitRight')[0].style.filter = 'blur(0px)';
    }

  return (
    <div className="edit-modal">
        <p className="editClose" onClick={closeModal}>X</p>

        <div className='editForm'>
          <form onSubmit={submit}>
            <h1 className='editHeader'>Edit Profile</h1>
            <label className='editTitle'>New PFP</label>
            <br/>
            <input className='editInput' type="file" onChange={(e) => setPfpFile(e.target.files[0])} accept='image/*'/>
            <br/>
            <br/>

            <label className='editTitle'>New Banner</label>
            <br/>
            <input className='editInput' type='file' onChange={(e) => setBannerFile(e.target.files[0])} accept='image/*'/>
            <br/>
            <br/>

            <label className='editTitle'>New Bio</label>
            <br/>
            <input className='editTextInput' data-testid={'bioField'} type='text' name='bio' onChange={e => setBio(e.target.value)} 
              value={bio} placeholder={user.bio}/>
            <br/>            
            <br/>

            <label className='editTitle'>New Username</label>
            <br/>             
            <input className='editTextInput' data-testid={'nameField'} type='text' name='newName' onChange={e => setName(e.target.value)} 
              value={name} placeholder={user.fullName}/>
            <br/>
            <br/>

            <button className='uploadButton' data-testId={'uploadButton'} type="submit">Upload</button>
          </form>
        </div>
    </div>
  )
}

export default EditModal