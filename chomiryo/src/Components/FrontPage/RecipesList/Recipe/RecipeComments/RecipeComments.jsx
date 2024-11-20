import React, { useState, useEffect } from 'react';
import './RecipeComments.css';

function RecipeComments({ recipeId }) {

    const [ newComment, setNewComment ] = useState('');
    const [ commentPosted, setCommentPosted ] = useState(false);
    const [ commentList, setCommentList ] = useState([]);

    //post new comment
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

    //gathers all the comments for this post/recipe and posters (users) userName
    useEffect(() => {
        const fetchComments = async () => {

            const url = `http://127.0.0.1:4000/comment/${recipeId}`;
            const options = {
                method: "GET",
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                })
            };
            
            try{
                const res = await fetch(url, options);
                const data = await res.json();
                
                const commentWithUserName = await Promise.all(
                    data.comments.map(async comment => {
                        const userRes = await fetch(`http://127.0.0.1:4000/auth/${comment.user}`);
                        const userData = await userRes.json();
                        return {...comment, userName: userData.foundUser.userName };
                })
            );
            setCommentList(commentWithUserName);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    fetchComments();
    }, [recipeId, commentPosted]);

    useEffect(() =>{
        if(commentList) {
            console.log(commentList)
        }
    }, [commentList])

    //get user by id for signature of comment 
    
    

  return (
    <div id='recipe-comments-component'>
        <form id='recipe-comments-form'>
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
        {commentList.length > 0 ? (
            commentList.map(comment => (
                <div 
                    id='comment-parent'
                    key={comment._id}>
                    <p 
                        id='comment-user-text'>
                        {comment.userName}
                    </p>
                    <p 
                        id='comment-body-text'>
                        {comment.body}
                    </p>
                </div>
            ))
        ) : "Be the first to comment"}
    </div>
  )
}

export default RecipeComments;