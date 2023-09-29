import { Children, useRef, useState } from "react";
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import Frame from "../../components/Frame/Frame";

import {v4} from 'uuid'
import { useNavigate } from "react-router";

import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined"
import {message} from 'antd'
import { IconButton } from "@mui/material";
import { useAuth } from "../../hooks";
import { Link } from "react-router-dom";

export default function AddRecipe() {


    const [selectedCategory, setSelectedCategory] = useState()
    const [instructions,setIntstructions] = useState([])
    const ref = useRef()


    const auth = useAuth()

    const addInstruction = () =>{
        const content = ref.current.value
        if(!content) {
            message.info({
                content:"Instruction cannot be empty",
                duration:2
            })
            return
        }
        let newInstructions = [...instructions, {
            position: (instructions.length + 1),
            display_text:content
        }]
        setIntstructions(newInstructions)
    }

    const nav = useNavigate()



    const removeInstruction = (index) => {
        setIntstructions(instructions.filter((item,idx) => idx !== index))
    }
    const addRecipe = (e) => {
        e.preventDefault()
        const thumbnail_url = e.target[0].value
        const name = e.target[1].value
        const country = selectedCategory
        const description = e.target[3].value


        const calories = e.target[4].value
        const carbohydrates  = e.target[5].value
        const fat = e.target[6].value
        const fiber = e.target[7].value
        const protein = e.target[8].value
        const sugar = e.target[9].value

        const time = e.target[10].value

        const recipe = {
            thumbnail_url,
            country,
            description,
            name,
            total_time_tier: {
                display_tier:time
            },
            nutrition: {
                calories,
                carbohydrates,
                fat,
                fiber,
                protein,
                sugar
            },
            instructions,
            user_ratings: {
                score: 4
            },
            id: v4()
        }
        const recipesExiting = localStorage.getItem(`recipes_${country}`)
        if (recipesExiting) {
            const recipes = JSON.parse(recipesExiting) 
            recipes.push(recipe)
            localStorage.setItem(`recipes_${country}`, JSON.stringify(recipes))
        } else {
            localStorage.setItem(`recipes_${country}`, JSON.stringify([recipe]))  
        }

        nav("/")

        message.success({
            content:"Successfully added new recipe",
            duration:1
        })

    }

    if(!auth.currentUser || !auth.currentUser.admin) {
        return <div style={{marginInline:'auto',padding:'16px'}}>You are not authorized to view this page <Link to ="/">Back home</Link></div>
    }
    return <Frame>

        <form onSubmit={addRecipe} className="add-recipe">
            <div className="top">

            <div className="top-details">
            <input type="text" placeholder="Enter image url"/>
            <input type="text" placeholder="Enter recipe name"/>

            <CategoryDropdown setCategory={setSelectedCategory} selected={selectedCategory} />
            <textarea type="text" placeholder="Enter recipe description"/>

            </div>

            <div className="nutrition-values">
                <b>Calories in grams:</b> 
                <input type="number" placeholder="enter amount"></input>
                <br/>
                <b>Carbohydrates in grams:</b>
                <input type="number" placeholder="enter amount"></input>

                <br/>
                <b>Fat in grams:</b>
                <input type="number" placeholder="enter amount"></input>
                <br/>
                <b>Fiber in grams:</b>
                <input type="number" placeholder="enter amount"></input>
                <br/>
                <b>Protein in grams:</b>
                <input type="number" placeholder="enter amount"></input>
                <br/>
                <b>Sugar in grams:</b>
                <input type="number" placeholder="enter amount"></input>
            </div>
            </div>

            <div>
            {/* recipe.total_time_tier.display_tier */}
             <p><b>Time: </b> </p>
                <input placeholder="Enter cooking time"/>
            </div>


            <input placeholder="Enter instruction content" ref ={ref}></input>
            <button type="button" onClick={ addInstruction } style={{transform:'scale(0.7)'}}>Add Instruction</button>

            <h4 style={{padding:0,margin:0}}>Instruction list</h4>
            <ol style={{padding:0,margin:0,marginLeft:'16px'}}>
                {Children.toArray(instructions.map((instruction,index) => <li
                style={{display:'flex',alignItems:'center',width:'fit-content'}}>
                    <IconButton className="icon-button" onClick={() => removeInstruction(index)}>

                   <DeleteIcon style={{marginInline:'16px',color:'#bd3333'}} />
                   </IconButton>

                    <div>{(index + 1) + ". " + instruction.display_text}</div>
                </li>))}
            </ol>

            <button type="submit">Add Recipe</button>

        </form>
    </Frame>
}