import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarRating from '../../StarRating/StarRating';
import RecipeComments from './RecipeComments/RecipeComments';
import walnut from '../../../../assets/walnut.png';
import './Recipe.css';
import { jwtDecode } from 'jwt-decode';

function Recipe({ viewingRecipePage }) {
    const location = useLocation();
    const recipeId = location.state?.recipeId;
    const [ singleRecipe, setSingleRecipe ] = useState({});
    const [ recipePhoto, setRecipePhoto ] = useState('');
    const [ photoChanged, setPhotoChanged ] = useState(false);
    const [ ingredientsList, setIngredientsList ] = useState([]);
    const [ uploadedBy, setUploadedBy ] = useState('');
    const [ stepsList, setStepsList ] = useState([]);
    const [ updateRecipe, setUpdateRecipe ] = useState(false);
    const [ editingRecipe, setEditingRecipe ] = useState(false);
    const [ updatedRecipeMessage, setUpdatedRecipeMessage ] = useState('');
    const [ loadingOrDeleted, setLoadingOrDeleted ] = useState('loading...');
    const [ recipeDeleted, setRecipeDeleted ] = useState(false);
    const navigate = useNavigate();


    //fetches the single post based on the recipe._id aka recipeId
    useEffect(() => {
        const url = `http://10.0.0.23:4000/post/${recipeId}`
        const options = {
            headers: new Headers({
                "Content-Type" : "application/json",
                "authorization" : localStorage.getItem("token")
            })
        }
        fetch(url, options)
            .then(res => res.json())
            .then(data => setSingleRecipe(data))
            .catch(err => err.message)
    }, []);

    useEffect(() => {
        if(singleRecipe.user) {
            const url = `http://10.0.0.23:4000/auth/${singleRecipe.user}`
            const options = {
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "authorization" : localStorage.getItem("token")
                })
            }
            fetch(url,options)
                .then(res => res.json())
                .then(data => setUploadedBy(data))
                .catch(err => err.message)
        }
    }, [singleRecipe])

    useEffect(() => {
        if(singleRecipe && singleRecipe.instructions) {
            setIngredientsList(singleRecipe.instructions.ingredients)
            setStepsList(singleRecipe.instructions.steps)
        }
    }, [singleRecipe]);

    // if the currently logged in user is the user that created the recipe then sets updateRecipe to true. if update recipe is true then there is a button that allows user to update/delete their own recipe
    useEffect(() => {
        if(uploadedBy && uploadedBy.foundUser) {
            if(uploadedBy.foundUser._id === jwtDecode(localStorage.getItem('token'))._id) {
                setUpdateRecipe(true);
            } else null
        }
    }, [uploadedBy]);

    // handle changing the list elements to inputs so the user can change anything about the recipe 
    const toggleUpdateRecipe = () => {
        setUpdatedRecipeMessage('');
        setEditingRecipe(true);
        if(editingRecipe) {
            window.location.reload();
        }
    }

    // handles the size of the inputs based on the text that was already in the post and if the user edits it 
        const changeRows = (textarea) => {
            if (textarea) {
                textarea.rows = 1;
                const currentRows = Math.floor(textarea.scrollHeight / textarea.clientHeight);
                textarea.rows = currentRows;
            }
        }

    // sets the useStates of the steps and ingredients list to what the user updates 
        const handleStepsInputChange = (value, i) => {
            const updatedSteps = [...stepsList];
            updatedSteps[i] = value;
            setStepsList(updatedSteps);
        }
        const handleIngredientsInputChange = (value, i) => {
            const updatedIngredients = [...ingredientsList];
            updatedIngredients[i] = value;
            setIngredientsList(updatedIngredients);
        };

        useEffect(() => {
            if(singleRecipe) {
                setRecipePhoto(singleRecipe.recipePhoto)
            }
        }, [singleRecipe])

        const handleSubmitRecipeUpdate = async e => {
            // e.preventDefault();
            console.log(singleRecipe)
            let updatedPostBody = {}
            updatedPostBody._id = singleRecipe._id;
            updatedPostBody.title = singleRecipe.title;

            if(singleRecipe.instructions.ingredients !== ingredientsList || singleRecipe.instructions.stepsList !== stepsList) {
                updatedPostBody.instructions = {};
            }

            if(singleRecipe.instructions.ingredients !== ingredientsList) {
                updatedPostBody.instructions.ingredients = ingredientsList;
            } else updatedPostBody.instructions.ingredients = singleRecipe.instructions.ingredients;

            if(singleRecipe.instructions.steps !== stepsList) {
                updatedPostBody.instructions.steps = stepsList
            } else updatedPostBody.instructions.steps = singleRecipe.instructions.steps

            if(photoChanged) {
                const s3Url = "http://10.0.0.23:4000/utilities/s3-url";
                
                const uploadUrl = await fetch(s3Url).then(res => res.json());
                
                await fetch(uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    },
                    body: recipePhoto
                }).then(res => console.log(res.status));

                const imageUrl = uploadUrl.split("?")[0];
            };

            fetch(`http://10.0.0.23:4000/post/updatepost/${singleRecipe._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type' : "application/json",
                    'authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify(updatedPostBody),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })

            setUpdatedRecipeMessage('Recipe Updated Successfully');
            setEditingRecipe(false);
        };

        //deletes recipe/post from database
        const handleDeleteRecipe = () => {
            const id = singleRecipe._id;
            fetch(`http://10.0.0.23:4000/post/delete/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "authorization" : localStorage.getItem('token')
                })
            })
            .then(res => res.json())
            .then(setRecipeDeleted(true))
        }

        useEffect(() => {
            setTimeout(() => {
                setLoadingOrDeleted('Recipe has been removed')
            }, '3000')
        }, [])



  return (
    <div id='single-recipe-component'>
{recipeDeleted ? (
    <div id='recipe-deleted-banner'>RECIPE DELETED</div>
        ) :
    null }
        <div id='single-recipe-title-and-image'>
            <div id='photo-swap-photo-button-parent'>
            <img 
                id='single-recipe-image'
                src={photoChanged ? URL.createObjectURL(recipePhoto) : recipePhoto} />

                {editingRecipe ? (
                    <div id='edit-recipe-photo-parent'>
                        <label>Change Photo</label>
                        <input 
                            type='file'
                            name='photo-file'
                            id='photo-file-upload'
                            accept='.jpeg, .jpg, .png, .webp'
                            onChange={e => {
                                setRecipePhoto(e.target.files[0])
                                setPhotoChanged(true)
                                console.log(e)}} />
                    </div>
                ) : (
                    null
                )}
            </div>

            <div style={{
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>
                <h2 id='single-recipe-title'>
                    {singleRecipe.title ? singleRecipe.title.toUpperCase() : loadingOrDeleted}
                </h2>
                <StarRating 
                    recipeRating={singleRecipe.averageRating}
                    viewingRecipePage={viewingRecipePage} 
                    recipeId={recipeId} />
                <h4 id='uploaded-by'>Uploaded by: {uploadedBy.foundUser ? uploadedBy.foundUser.userName : 'Unknown'}</h4>
            </div>

        </div>
        <div id='ingredients-steps-parent'>
            <div id='ingredients'>
                <h3>Ingredients</h3>

                <ul>
                    {ingredientsList 
                        ? ingredientsList.map((item, i) =>(
                            editingRecipe ? (
                                <textarea
                                    className='editing-recipe-inputs'
                                    key={i}
                                    value={item}
                                    onChange={e => handleIngredientsInputChange(e.target.value,i)}
                                    onInput={e => changeRows(e.target)} />
                                ) : (
                                <li
                                key={i}>
                                    {item}
                                </li>
                            )

                        )) 
                        : "Loading..."}
                </ul>
            </div>
            <div id='steps'>
                <h3>Steps</h3>
                <ol>
                {stepsList
                    ? stepsList.map((item,i) => (
                        editingRecipe ? (
                            <textarea
                                className='editing-recipe-inputs'
                                key={i}
                                value={item}
                                onChange={e => handleStepsInputChange(e.target.value, i)} 
                                onInput={e => changeRows(e.target)}/>
                            ) : (
                                <li
                                    key={i}>
                                    {item}
                                </li>
                                )
                            ))
                        : "Loading..."}
                </ol>
            </div>
        </div>
                    <button
                        id='update-recipe-button'
                        onClick={() => toggleUpdateRecipe()}>
                        { editingRecipe ? 'Cancel Editing' : 'Edit Recipe'}
                    </button>
        { editingRecipe
            ? (
                <div id='editing-recipe-buttons-parent'>
                    <button
                        className='edit-recipe-buttons'
                        id='delete-recipe-button'
                        onClick={() => handleDeleteRecipe()}>
                        Delete Recipe
                    </button>
                    <div id='editing-recipe-bottom-border'></div>
                    <button
                        className='edit-recipe-buttons'
                        id='submit-recipe-changes-button'
                        onClick={() => handleSubmitRecipeUpdate()}>
                        Submit Changes
                    </button>
                </div>
            ) 
            : null }
            <p id='updated-recipe-message'>{updatedRecipeMessage}</p>
        <div 
            id="recipe-bottom-border">
        </div>
        <RecipeComments 
            recipeId={recipeId}/>
    </div>
  )
}

export default Recipe;