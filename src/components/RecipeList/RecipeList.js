import './RecipeList.css'


import usaFlag from '../../images/usa.png'
import mexicoFlag from '../../images/mexico.png'
import franceFlag from '../../images/france.png'
import indiaFlag from '../../images/india.png'
import italyFlag from '../../images/italy.png'


import { FavoriteOutlined } from '@mui/icons-material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useFavoriteRecepies } from '../../hooks'

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

export const IconComponent = ({ country }) => {
    if (country === "mexican")
        return <Icon className='pad' src={mexicoFlag} />
    if (country === 'italian')
        return <Icon className='pad' src={italyFlag} />
    if (country === 'french')
        return <Icon className='pad' src={franceFlag} />
    if (country === 'indian')
        return <Icon className='pad' src={indiaFlag} />
    return <Icon className='pad' src={usaFlag} />
}

export const AbsoluteIconComponent = ({ country }) => {
    if (country === "mexican")
        return <AbsoluteIcon className='pad' src={mexicoFlag} />
    if (country === 'italian')
        return <AbsoluteIcon className='pad' src={italyFlag} />
    if (country === 'french')
        return <AbsoluteIcon className='pad' src={franceFlag} />
    if (country === 'indian')
        return <AbsoluteIcon className='pad' src={indiaFlag} />
    return <AbsoluteIcon className='pad' src={usaFlag} />
}

const bottomButtonStyle = { marginLeft: 'auto', marginRight: '12px', marginBottom: '4px' }
// Add Rating with Stars
function Recipe({ recipe, belongsToCurrentUser, inFavorites, favoritesContext, showFavorites }) {
    const nav = useNavigate()
    return <div className="recipe-card" onClick={(e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg' || e.target.tagName === 'path') return
        nav(`/recipe/${recipe.country.length > 0 ? recipe.country : "usa"}/${recipe.id}`)
    }}>
        <img className='recipe-image' src={recipe.thumbnail_url} />
        <p className='text-bold pad'>{recipe.name}</p>

        <Row>
            <IconComponent country={recipe.country} />
            <Score style={{ minWidth: 'max-content' }}>Rating: {recipe.user_ratings.score > 0.9 ? "Good" : "Fine"}</Score>
            {showFavorites && <FavoriteOutlined
                onClick={() => {
                    favoritesContext.toggleRecipe(recipe)
                    if (recipe.isFavorite && inFavorites) {
                        inFavorites.remove(recipe.id)
                    }
                }}
                style={{ marginLeft: 'auto', marginRight: '8px', color: recipe.isFavorite ? 'red' : 'black' }} />}
        </Row>
        {belongsToCurrentUser && <Row>
            <Link to={`/edit-recipe/${recipe.country ?? 'usa'}/${recipe.id}`} style={bottomButtonStyle}><button style={{ padding: '4px', cursor: 'pointer' }}>Edit</button></Link>
        </Row>}
    </div>
}

export default function RecipeList({ setAllRecipes = () => { }, inFavorites = {remove:() => {}}, showFavorites = true, recipes, auth }) {
    const favoritesContext = useFavoriteRecepies({ setAllRecipes })



    return <div className={"recipe-list"}>
        {recipes.map(recipe => <Recipe
            inFavorites={inFavorites}
            showFavorites={showFavorites}
            favoritesContext={favoritesContext}
            belongsToCurrentUser={
                (auth?.currentUser?.id === recipe.userId || auth?.currentUser?.admin)
            }
            key={recipe.id} recipe={recipe} />)}
    </div>
}