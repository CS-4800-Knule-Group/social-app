import {React, useState} from 'react'
import './EditModal.css'

const EditModal = () => {
    
    const [file, setFile] = useState()
    const [caption, SetCaption] = useState("")

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)
        //Insert API push here

        const response = await fetch('http://localhost:3000/users/updateProfile', {
          method: 'PUT',
          headers: {
            'Content-Type' : 'multipart/form-data'
          },
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

    function handleChange(event) {
        setFile(event.target.files[0])
    }

  return (
    <div className="edit-modal">
        <form onSubmit={submit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange} accept='image/*'/>
          <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default EditModal