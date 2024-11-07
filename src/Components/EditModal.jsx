import {React, useState} from 'react'
import './EditModal.css'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const EditModal = ({user}) => {
    
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

        const response = await fetch('https://knule.duckdns.org/users/updateProfile', {
          method: 'PUT',
          body: formData
        })


        //Need to find a way to refresh the page AFTER doing everything...
        //Maybe force refresh after it all? Else need to add functionality to 
        //Make the update in profile when new data appears.

        //Maybe add an "X" button over the modal that will close the app
        //by updating the state back in profile.jsx? Would probably be a
        //"Only render when true" situation. Would also isolate profile
        //AND WOULD BE A DESIGN PRINCIPLE :O
    }

    function updatePfp(event) {
        setPfpFile(event.target.files[0])
    }
    
    function updateBanner(event) {
      setBannerFile(event.target.files[0])
    }


  return (
    <div className="edit-modal">
        <form onSubmit={submit}>
          <h1>React File Upload</h1>
          <label>New Pfp</label>
          <input type="file" onChange={updatePfp} accept='image/*'/>
          <br/>

          <label>New Banner</label>
          <input type='file' onChange={updateBanner} accept='image/*'/>
          <br/>

          <label>New Bio</label>
          <input type='text' name='bio' onChange={e => setBio(e.target.value)} 
            value={bio} placeholder={user.bio}/>
          <br/>

          <label>New Username</label>
          <input type='text' name='newName' onChange={e => setName(e.target.value)} 
            value={name} placeholder={user.fullName}/>
          <br/>
          
          <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default EditModal