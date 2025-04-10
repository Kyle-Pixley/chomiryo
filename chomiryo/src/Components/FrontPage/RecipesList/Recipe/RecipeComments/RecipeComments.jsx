import React, { useState, useEffect } from 'react';
import './RecipeComments.css';

function RecipeComments({ recipeId }) {

    const [ newComment, setNewComment ] = useState('');
    const [ commentPosted, setCommentPosted ] = useState(false);
    const [ commentList, setCommentList ] = useState([]);
    const [ numberOfComments, setNumberOfComments ] = useState(-10);

    //post new comment to the database
    const handleCommentSubmit = async e => {
        e.preventDefault();
        const body = { body: newComment };
        
        const url = `/comment/create/${recipeId}`;

        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            })
        }
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error("Failed to post comment");

            const data = await res.json();
            setNewComment('');
            setCommentPosted(!commentPosted);
        } catch (err) {
            console.error("error posting comment: ", err);
        }
    };

    //gathers all the comments for this post/recipe and posters (users) userName
    useEffect(() => {
        const fetchComments = async () => {

            const url = `/comment/${recipeId}`;
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
                        const userRes = await fetch(`/auth/${comment.user}`);
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

    // allows user to see more comments if there are more comments otherwise button does not render 
    const loadMoreComments = e => {
        let negativeCommentListLength = -Math.abs(commentList.length);

        if(numberOfComments > negativeCommentListLength) {
            return (
                <button
            id='load-more-comments-button'
            onClick={() => setNumberOfComments(numberOfComments - 10)}>
                Load More Comments
            </button>
            )
        } else return null 
    }

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
                id='submit-comment-button'
                type='submit'
                onClick={handleCommentSubmit}>
                    Post
                </button>
        </form>
        {commentList.length > 0 ? (
            commentList.slice(numberOfComments).reverse().map(comment => (
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
                    <div id='comment-bottom-border'></div>
                </div>
            ))
        ) : "Be the first to comment"}
        {loadMoreComments()}
    </div>
  )
}

export default RecipeComments;