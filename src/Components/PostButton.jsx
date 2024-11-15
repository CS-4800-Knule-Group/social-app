import React, { useState } from 'react'

const PostButton = (decryptToken) => {
    const [postContent, setPostContent] = useState();

    const apiPosts = 'https://knule.duckdns.org/posts'


    const sendPost = async() => {
        try{
            const response = await fetch(apiPosts + "/" + decryptToken.userId, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
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