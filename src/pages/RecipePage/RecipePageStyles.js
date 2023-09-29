import styled from "@emotion/styled"

export const RecipeImage = styled.img`
    max-height:400px;
    width:fit-content;
    object-fit:contain;
    border:1px solid black;
`

export const RecipePageStyle = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`

export const RecipeHeader = styled.div`
    display:flex;
    flex-direction:row;

    @media only screen and (max-width:800px) {
        flex-direction:column;
        align-items:center;
        row-gap:16px;
    }
` 
export const RecipeDetails = styled.div`
    background:white;
    position:relative;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 3px;
    padding:16px;
    border:1px solid lightgray;
    border-radius:8px;
    opacity:0.8;
    width:100%;
    margin-left:16px;
    @media only screen and (max-width:800px) {
        margin-inline:auto;
    }
`
export const RecipeDetailsHeader = styled.h2`
    color:black;
    padding:0px;
    margin:0px;
    margin-top:20px;
`

export const RecipeBody = styled(RecipeDetails)`
    display:flex;
    margin-block:16px;
    margin-inline:auto;
    flex-direction:column;
`

