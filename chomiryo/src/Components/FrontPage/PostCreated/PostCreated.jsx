import React, { useEffect, useState } from 'react';
import './PostCreated.css';

function PostCreated({ postCreated, setPostCreated, setPostRecipe }) {

const [ postUploaded, setPostUploaded ] = useState(false);

  //sets PostUploaded to true after 2 seconds for no real reason other than giving the user info that there recipe was posted successfully. Also coincides with the loading bar animation which is also 2 seconds.
  useEffect(() => {
    if(postCreated) {
        setTimeout(() => {
            setPostUploaded(true)
        }, 2000)
    }
}, [ postCreated ])

  //sets these useStates to false thus showing the home screen/ recipe list 
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