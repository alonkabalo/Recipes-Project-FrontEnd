import { useEffect, useState } from 'react'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'
import Frame from '../../components/Frame/Frame'
import RecipeList, { Row } from '../../components/RecipeList/RecipeList'
import { useRecepies } from '../../hooks'
import './Home.css'
import SearchBarComponent from '../../components/SearchBar/SearchBar'

export default function Home() {

    const [category, setCategory] = useState('mexican') 
    const {allRecipes} = useRecepies(category)

    const [filteredReceipes, setFilteredRecipes] = useState(allRecipes)

    useEffect(() => {
        setFilteredRecipes(allRecipes)
    },[allRecipes])

    return <Frame>
        <Row>
            <CategoryDropdown setCategory={setCategory} selected ={category}/>
            <SearchBarComponent filter ={(input) =>{
                if(!input) { // "" == false
                    setFilteredRecipes(allRecipes)
                    return;
                }
                setFilteredRecipes(allRecipes.filter(recipe => recipe.name.toLowerCase().includes(input.toLowerCase())))
            }}/>
        </Row>
        <br/>
        <RecipeList recipes={filteredReceipes}/>
    </Frame>
}