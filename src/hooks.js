import { useEffect, useState } from "react"
import { getAllRecipes } from "./api"
import { useNavigate } from "react-router"


export const useRecepies = (country) => {
    const [allRecipes, setAllRecepies] = useState([])
  
    useEffect(() => {
      const fetchRecipes = async () => {
        let additionRecipes = []
        const recipesExiting = localStorage.getItem(`recipes_${country}`)
        if(recipesExiting) {
          const recipes = JSON.parse(recipesExiting) 
          if(recipes.length > 7) {
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
        localStorage.setItem(`recipes_${country}`, JSON.stringify([...recipes,...additionRecipes]))
        setAllRecepies(recipes)
      }
      fetchRecipes()
    },[country])

    const getRecipeById = (id) => {
        const recipe = allRecipes.find(recipe => recipe.id == id)
        return recipe
    }

    return {allRecipes,getRecipeById}
}


function getUsersLocal() {
    let usersString = localStorage.getItem('users')
    let users  = []
    if(usersString) 
        users = JSON.parse(usersString)
    return users
}

export const useAuth = () => {

    const nav = useNavigate()

    const [currentUser,setCurrentUser] = useState()

    useEffect(() => {
        const email = localStorage.getItem('currentUser')
        if(email) {
            const users = getUsersLocal()
            const user = users.find(u => u.email === email)
            setCurrentUser(user)
        }
    },[])


    return {
        submit_logout: () => {
            localStorage.removeItem('currentUser')
            setCurrentUser(undefined)
            alert("See you next time!")
        },
        submit_login: (email,password) =>  {
            let users = getUsersLocal()
            
            const existingUser = users.find(user => user.email === email)

            if(!existingUser) 
                throw Error(`Email does not exist`)

            if(existingUser.password !== password) 
                throw Error(`Wrong password entered`)

            localStorage.setItem('currentUser', email)  
            setCurrentUser(existingUser)
            
            nav('/') // Navigate to home page 
            alert(`Welcome back, ${existingUser.name}!`)
            return existingUser
        },
        submit_register: (name, email, password) =>  {
            let users = getUsersLocal()
            
            const existingUser = users.find(user => user.email === email)

            if(existingUser) 
                throw Error(`Email already exists`)

            const user = {name, email, password}
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

