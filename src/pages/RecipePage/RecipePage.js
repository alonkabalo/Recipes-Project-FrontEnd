import { useNavigate, useParams } from "react-router"
import { useRecepies } from "../../hooks"
import { Children, useCallback, useMemo } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Frame from "../../components/Frame/Frame"
import { AbsoluteIconComponent } from "../../components/RecipeList/RecipeList"
import {Modal, message} from 'antd'

import {
     RecipeBody,
     RecipeDetails,
     RecipeDetailsHeader,
     RecipeHeader,
     RecipeImage,
     RecipePageStyle } from "./RecipePageStyles"
import styled from "@emotion/styled";

     /*
    calories
carbohydrates
fat
fiber
protein
sugar
*/


const Nutrition = ({nutrition}) => {
    return <div>
        <b>Calories:</b> {nutrition.calories}
        <br/>
        <b>Carbohydrates:</b> {nutrition.carbohydrates}g
        <br/>
        <b>Fat:</b> {nutrition.fat}g
        <br/>
        <b>Fiber:</b> {nutrition.fiber}g
        <br/>
        <b>Protein:</b> {nutrition.protein}g
        <br/>
        <b>Sugar:</b> {nutrition.sugar}g
    </div>
}

const Instruction = ({ instruction }) => {
    return <div>
        {instruction.position}. { instruction.display_text}
    </div>
}

const Instructions = ({recipe}) => {
    return <div>
        <h3 style={{textDecoration:'underline'}}>Instructions</h3>
        {Children.toArray(recipe.instructions.map(intruction => <Instruction instruction={intruction}/>))}
    </div>
}




const UserRatings = ({recipe}) => {


    const Stars = useCallback(() => {
        const stars = []
        let rating = recipe.user_ratings.score * 5
        let numStars = Math.floor(rating)
        let fraction = rating % 1
        if(fraction > 0.5) {
            stars.push(<StarIcon style={{color:'gold'}}/>)
        } 

        for(let i = 0;  i < numStars; i++) 
            stars.push(<StarIcon style={{color:'gold'}}/>)
        return <> {stars} </>
    },[])

    return <div className="right">
        <Stars/>
    </div>
}

export default function RecipePage() {
    const { country, recipeId } = useParams()
    const nav = useNavigate()
    const { getRecipeById } = useRecepies(country === 'usa' ? '' : country)
    const recipe = useMemo(() => getRecipeById(recipeId),[country, recipeId, getRecipeById])
    if(!recipe) return null
  
  
   return <Frame>
        <RecipePageStyle>

        <RecipeHeader>
             <RecipeImage src ={recipe.thumbnail_url}/>
         <RecipeDetails>

           <RecipeDetailsHeader>
             {recipe.name}
           </RecipeDetailsHeader>
          <AbsoluteIconComponent country={recipe.country}/>
          <p className="max-width-800">{recipe.description}</p>
          <Nutrition nutrition={recipe.nutrition}/>
          <p><b>Time: </b> {recipe.total_time_tier.display_tier}</p>
         </RecipeDetails>
        
        </RecipeHeader>

        <RecipeBody>
            <Instructions recipe={recipe}/>

            <UserRatings recipe={recipe}/>
        </RecipeBody>

        <button onClick={() => {
           Modal.confirm({
            content:"Would you like to delete "  + recipe.name,
            onOk:() => {
                let c = country === 'usa' ? '' : country 
                const recipes = JSON.parse(localStorage.getItem(`recipes_${c}`))
                let index = recipes.findIndex(r => r.id === recipe.id)
                recipes.splice(index,1)
                localStorage.setItem(`recipes_${c}`, JSON.stringify(recipes))
                nav("/")
                message.success("Recipe deleted successfully")
            }
           })

        }}>Delete</button>
        </RecipePageStyle>
    </Frame>
}