import { useEffect, useState } from 'react'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'
import Frame from '../../components/Frame/Frame'
import RecipeList, { Row } from '../../components/RecipeList/RecipeList'
import { useAuth, useRecepies, useUserRecepies } from '../../hooks'
import '../Home/Home.css'
import SearchBarComponent from '../../components/SearchBar/SearchBar'

export default function MyCards({ auth }) {
    const { userRecipes } = useUserRecepies()
    const [filteredReceipes, setFilteredRecipes] = useState(userRecipes)

    useEffect(() => {
        setFilteredRecipes(userRecipes)
    }, [userRecipes])

    if (!auth || !auth.currentUser) return <h1>You need to login first</h1>
    if (auth.currentUser.type !== 'business' && !auth.currentUser.admin) {
        return <h1>You need to have a business account to see this page</h1>
    }
    return <Frame>
        <Row>
            <SearchBarComponent filter={(input) => {
                if (!input) { // "" == false
                    setFilteredRecipes(userRecipes)
                    return;
                }
                setFilteredRecipes(userRecipes.filter(recipe => recipe.name.toLowerCase().includes(input.toLowerCase())))
            }} />
        </Row>
        {(!userRecipes || userRecipes.length === 0) && <p>Hello <b>{auth.currentUser.name}</b> You have no recipes yet</p>}

        <br />
        <RecipeList showFavorites={false} auth={auth} recipes={filteredReceipes} />
    </Frame>
}