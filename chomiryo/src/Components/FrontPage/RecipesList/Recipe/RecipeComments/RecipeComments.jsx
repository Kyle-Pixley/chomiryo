import React, { useState, useEffect } from 'react';
import './RecipeComments.css';

function RecipeComments({ recipeId }) {

    const [ newComment, setNewComment ] = useState('');
    const [ commentPosted, setCommentPosted ] = useState(false);
    const [ commentList, setCommentList ] = useState({});

    const handleCommentSubmit = e => {
        e.preventDefault();
        const body = { body: newComment };
        
        const url = `http://127.0.0.1:4000/comment/create/${recipeId}`;

        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            })
        }

        fetch(url, options)
            .then(res => res.json())
            .then(setCommentPosted(!commentPosted))
            .catch(err => console.error("Error: ", err))
    };

    //gathers all the comments for this post/recipe
    useEffect(() => {
        const url = `http://127.0.0.1:4000/comment/${recipeId}`;
        const options = {
            method: "GET",
            headers: new Headers({
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${localStorage.getItem('token')}`
            })
        }
        fetch(url,options)
            .then(res => res.json())
            .then(data => setCommentList(data))
            .catch(err => console.error("Error: ", err))
    }, [commentPosted]);
    useEffect(() =>{
        if(commentList) {
            console.log(commentList)
        }
    }, [commentList])

  return (
    <div>
        <form>
            <input
                id='comment-input'
                type='text'
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder='Leave A Comment'>
                </input>
            <button 
                type='submit'
                onClick={handleCommentSubmit}>
                    Post
                </button>
        </form>
        {commentList.comments ? (
            commentList.comments.map(comment => (
                <p key={comment._id}>{comment.body}</p>
            ))
        ) : "Be the first to comment"}
    </div>
  )
}

export default RecipeComments;