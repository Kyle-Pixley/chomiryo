import React, { useEffect, useState } from 'react';
import './PostCreated.css';

function PostCreated({ postCreated, setPostCreated, setPostRecipe }) {
const [ postUploaded, setPostUploaded ] = useState(false);
  useEffect(() => {
    if(postCreated) {
        setTimeout(() => {
            setPostUploaded(true)
        }, 2000)
    }
}, [ postCreated ])

  const handleReturnHome = () => {
    setPostRecipe(false);
    setPostCreated(false);
    setPostUploaded(false);
  }

  return (
    <div id='post-created-component'>
      {postUploaded
        ? (
          <div>Recipe Uploaded</div>
        )
        : (
          <div>Uploading Recipe...</div>
        )}
      <div id='loading-bar'><div></div></div>
      {postUploaded 
        ? ( 
          <button
            id='return-home-button'
            onClick={(() => handleReturnHome())}>Return Home</button>
      ) : null}
    </div>
  )
}

export default PostCreated;