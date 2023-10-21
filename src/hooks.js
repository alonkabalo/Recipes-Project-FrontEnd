import { useEffect, useMemo, useState } from "react"
import { getAllRecipes } from "./api"
import { useNavigate } from "react-router"

import { v4 } from "uuid"
export const useRecepies = (country) => {
    const [allRecipes, setAllRecepies] = useState([])

    useEffect(() => {
        const fetchRecipes = async () => {
            let additionRecipes = []
            const recipesExiting = localStorage.getItem(`recipes_${country}`)
            if (recipesExiting) {
                const recipes = JSON.parse(recipesExiting)
                if (recipes.length > 7) {
                    setAllRecepies(recipes)
                    return;
                } else {
                    additionRecipes = recipes
                }
            }
            let recipes = await getAllRecipes(country)
            recipes = recipes.map(recipe => {
                recipe.country = country
                return recipe
            })
            localStorage.setItem(`recipes_${country}`, JSON.stringify([...recipes, ...additionRecipes]))
            setAllRecepies(recipes)
        }
        fetchRecipes()
    }, [country])

    const getRecipeById = (id) => {
        const recipe = allRecipes.find(recipe => recipe.id == id)
        return recipe
    }

    return { allRecipes, getRecipeById, setAllRecepies }
}


export const useUserRecepies = () => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const recipesExiting = localStorage.getItem(`recipes_user`)
        if (recipesExiting) {
            const recipes = JSON.parse(recipesExiting)
            setRecipes(recipes)
        }
    }, [])

    return { userRecipes: recipes }
}


export const useFavoriteRecepies = ({ setAllRecipes } = { setAllRecipes: () => { } }) => {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const recipesExiting = localStorage.getItem(`recipes_favorites`)
        if (recipesExiting) {
            const recipes = JSON.parse(recipesExiting)
            setRecipes(recipes.map(r => ({ ...r, isFavorite: true })))
        }
    }, [])

    return {
        userRecipes: recipes,
        toggleRecipe: (recipe) => {
            const recipesExiting = localStorage.getItem(`recipes_favorites`)
            if (recipesExiting) {
                const recipes = JSON.parse(recipesExiting)
                const current = recipes.findIndex(r => r.id === recipe.id)
                if (current > -1) {
                    recipes.splice(current, 1)
                    // set isFavorite on the recipe in recipes_country
                    const recipesCountry = JSON.parse(localStorage.getItem(`recipes_${recipe.country}`))
                    const currentCountry = recipesCountry.findIndex(r => r.id === recipe.id)
                    recipesCountry[currentCountry].isFavorite = false
                    localStorage.setItem(`recipes_${recipe.country}`, JSON.stringify(recipesCountry))
                    setAllRecipes(recipesCountry)
                } else {
                    recipes.push(recipe)

                    // set isFavorite on the recipe in recipes_country
                    const recipesCountry = JSON.parse(localStorage.getItem(`recipes_${recipe.country}`))
                    const currentCountry = recipesCountry.findIndex(r => r.id === recipe.id)
                    recipesCountry[currentCountry].isFavorite = true
                    localStorage.setItem(`recipes_${recipe.country}`, JSON.stringify(recipesCountry))
                    setAllRecipes(recipesCountry)
                }
                localStorage.setItem(`recipes_favorites`, JSON.stringify(recipes))
                setRecipes([...recipes])
            } else {
                localStorage.setItem(`recipes_favorites`, JSON.stringify([recipe]))
                setRecipes([recipe])
            }
        }
    }
}


function getUsersLocal() {
    let usersString = localStorage.getItem('users')
    let users = []
    if (usersString)
        users = JSON.parse(usersString)
    return users
}

export const useAuth = () => {

    const nav = useNavigate()

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const email = localStorage.getItem('currentUser')
        if (email) {
            const users = getUsersLocal()
            const user = users.find(u => u.email === email)
            setCurrentUser(user)
        }
    }, [])


    return {
        submit_logout: () => {
            localStorage.removeItem('currentUser')
            setCurrentUser(undefined)
            alert("See you next time!")
        },
        submit_login: (email, password) => {
            let users = getUsersLocal()

            const existingUser = users.find(user => user.email === email)

            if (!existingUser)
                throw Error(`Email does not exist`)

            if (existingUser.password !== password)
                throw Error(`Wrong password entered`)

            localStorage.setItem('currentUser', email)
            setCurrentUser(existingUser)

            nav('/') // Navigate to home page 
            alert(`Welcome back, ${existingUser.name}!`)
            return existingUser
        },
        submit_register: (name, email, type, password) => {
            let users = getUsersLocal()

            const existingUser = users.find(user => user.email === email)

            if (existingUser)
                throw Error(`Email already exists`)

            const user = { name, email, type, password, id: v4() }
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))
            localStorage.setItem('currentUser', email)
            setCurrentUser(user)
            nav('/') // Navigate to home page 
            alert(`Welcome, ${user.name}!`)
            return user
        },
        currentUser
    }
}

