import './RecipeList.css'


import usaFlag from '../../images/usa.png'
import mexicoFlag from '../../images/mexico.png'
import franceFlag from '../../images/france.png'
import indiaFlag from '../../images/india.png'
import italyFlag from '../../images/italy.png'



import styled from '@emotion/styled'
import { useNavigate } from 'react-router'

const Icon = styled.img`
    max-width:50px;
    max-height:50px;
`
const AbsoluteIcon = styled(Icon)`
    position:absolute;
    top:8px;
    right:8px;
`

const Score = styled.div`
    max-width:50px;
    max-height:50px;
`
export const Row = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    align-items:center;
    col-gap:8px;
`

export const IconComponent = ({country}) => {
   if(country === "mexican")
        return <Icon className='pad' src={mexicoFlag}/>   
   if(country === 'italian')
        return <Icon className='pad' src={italyFlag}/>       
   if(country === 'french')
        return <Icon className='pad' src={franceFlag}/>       
   if(country === 'indian')
        return <Icon className='pad' src={indiaFlag}/>            
    return  <Icon className='pad' src={usaFlag}/>
}

export const AbsoluteIconComponent = ({country}) => {
    if(country === "mexican")
         return <AbsoluteIcon className='pad' src={mexicoFlag}/>   
    if(country === 'italian')
         return <AbsoluteIcon className='pad' src={italyFlag}/>       
    if(country === 'french')
         return <AbsoluteIcon className='pad' src={franceFlag}/>       
    if(country === 'indian')
         return <AbsoluteIcon className='pad' src={indiaFlag}/>            
     return  <AbsoluteIcon className='pad' src={usaFlag}/>
 }


// Add Rating with Stars
function Recipe({recipe}) {
    const nav = useNavigate()
    return <div className="recipe-card" onClick={() => 
    {  
        nav(`/recipe/${recipe.country.length > 0 ? recipe.country: "usa"}/${recipe.id}`)
    }}>
        <img className='recipe-image' src ={recipe.thumbnail_url}/>
        <p className='text-bold pad'>{recipe.name}</p>
        <Row>
            <IconComponent country = {recipe.country}/>
            <Score>{recipe.user_ratings.score > 0.9 ? "Good" : "Fine"}</Score>
        </Row>

    </div>
}

export default function RecipeList({recipes}) {
    return <div className="recipe-list">
        {recipes.map(recipe => <Recipe key ={recipe.id} recipe={recipe}/>)}
    </div>
}