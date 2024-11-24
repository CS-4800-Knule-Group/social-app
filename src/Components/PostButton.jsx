import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../authContext';



const PostButton = () => {
    const [postContent, setPostContent] = useState();

    const apiPosts = 'http://localhost:3000/posts'
    const {user, isAuth} = useAuth();
    const cookie = Cookies.get('loginAuth');
    const cookieDecode = jwtDecode(Cookies.get('loginAuth'));

    console.log(cookie);
    console.log(cookieDecode)



    const sendPost = async() => {
        try{
            const response = await fetch(apiPosts + "/" + user.userId, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'authorization' : 'BEARER ' + cookie
                },
                body: JSON.stringify({
                    "content": postContent
                }
            )})
            const postResult = await response;
            console.log(postResult);
            //window.location.reload();
        } catch (err){
            console.error("Post failed. " + err);
        }
    }
    //
    const handleChange = (e) => {
        setPostContent(e.target.value)
    }


  return (
    <div>
        <div className='post-input'>
                <input type='text' placeholder=" Post text" className="post-textBox" onChange={handleChange}/>
                    <br/>
                <button className='post-button' onClick={sendPost}>
                    Post
                </button>
        </div>
    </div>
  )
}

export default PostButton